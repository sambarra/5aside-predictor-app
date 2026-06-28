// build-20260609
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { GROUP_STAGE_FIXTURES } from '../data/fixtures';
import { getBoosterForStage, applyBooster, removeBooster } from './Booster';
import { STAGES } from '../data/knockoutFixtures';
import { GROUP_STAGE_SCORING } from '../data/knockoutFixtures';
import MatchCard from '../components/MatchCard';
function groupByDate(fixtures) {
  const groups = {};
  fixtures.forEach(f => {
    const d = new Date(f.kickoff);
    const key = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(f);
  });
  return groups;
}

const FILTER_OPTIONS = ['All', 'Upcoming', 'Today', 'Completed'];

export default function Fixtures() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState({});
  const [results, setResults] = useState({});
  const [filter, setFilter] = useState('Upcoming');
  const [loading, setLoading] = useState(true);
  const [knockoutFixturesList, setKnockoutFixturesList] = useState([]);
  const [allPredsByFixture, setAllPredsByFixture] = useState({});
  const [boosters, setBoosters] = useState({}); // { [stage]: fixtureId }

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load ALL predictions — current user's for form state, all for reveal panel
      const allPredsSnap = await getDocs(collection(db, 'predictions'));
      const predsMap = {};
      const allByFixture = {};
      allPredsSnap.forEach(d => {
        const data = d.data();
        if (data.userId === user.id) predsMap[data.fixtureId] = data;
        if (!allByFixture[data.fixtureId]) allByFixture[data.fixtureId] = [];
        allByFixture[data.fixtureId].push(data);
      });
      setPredictions(predsMap);
      setAllPredsByFixture(allByFixture);

      // Load results
      const resultsSnap = await getDocs(collection(db, 'results'));
      const resultsMap = {};
      resultsSnap.forEach(d => { resultsMap[d.id] = d.data(); });
      setResults(resultsMap);

      // Load active knockout fixtures
      const koSnap = await getDocs(collection(db, 'knockoutFixtures'));
      const koList = [];
      koSnap.forEach(d => { const data = d.data(); if (data.active) koList.push({ ...data, id: d.id }); });
      setKnockoutFixturesList(koList);

      // Load all boosters for this user across all stages
      const boostersQuery = query(collection(db, 'boosters'), where('userId', '==', user.id));
      const boostersSnap = await getDocs(boostersQuery);
      const boostersMap = {};
      boostersSnap.forEach(d => { const data = d.data(); boostersMap[data.stage] = data.fixtureId; });
      setBoosters(boostersMap);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleApplyBooster(fixtureId, stage) {
    await applyBooster(user.id, stage, fixtureId);
    setBoosters(prev => ({ ...prev, [stage]: fixtureId }));
  }

  async function handleRemoveBooster(stage) {
    await removeBooster(user.id, stage);
    setBoosters(prev => { const n = { ...prev }; delete n[stage]; return n; });
  }

  async function savePrediction(fixtureId, data) {
    const id = `${user.id}_${fixtureId}`;
    await setDoc(doc(db, 'predictions', id), {
      userId: user.id,
      userName: user.name,
      fixtureId,
      ...data,
      savedAt: new Date().toISOString(),
    });
    setPredictions(prev => ({ ...prev, [fixtureId]: { fixtureId, userId: user.id, ...data } }));
  }

  const now = new Date();
  const today = now.toDateString();

  const allFixtures = [
    ...GROUP_STAGE_FIXTURES.map(f => ({ ...f, stage: 'group' })),
    ...knockoutFixturesList,
  ].sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  const fixturesWithResults = allFixtures.map(f => ({
    ...f,
    result: results[f.id] || null,
  }));

  const filtered = fixturesWithResults.filter(f => {
    const ko = new Date(f.kickoff);
    if (filter === 'Upcoming') return ko > now;
    if (filter === 'Today') return ko.toDateString() === today;
    if (filter === 'Completed') return f.result != null;
    return true;
  });

  const grouped = groupByDate(filtered);

  const totalPredicted = Object.keys(predictions).length;
  // Determine current stage for UI labels (most imminent or most recent)
  const upcomingFixtures = allFixtures.filter(f => new Date(f.kickoff) > now);
  const currentStageId = upcomingFixtures.length > 0
    ? (upcomingFixtures[0].stage || 'group')
    : (allFixtures.length > 0 ? (allFixtures[allFixtures.length - 1].stage || 'group') : 'group');
  const currentStageInfo = currentStageId === 'group'
    ? { label: 'Group Stage', pointsExact: GROUP_STAGE_SCORING.pointsExact, pointsResult: GROUP_STAGE_SCORING.pointsResult, pointsGD: GROUP_STAGE_SCORING.pointsGD, pointsScorer: GROUP_STAGE_SCORING.pointsScorer }
    : { label: STAGES[currentStageId]?.label || 'Knockout', ...STAGES[currentStageId] };

  const upcoming = allFixtures.filter(f => new Date(f.kickoff) > now).length;
  const progress = allFixtures.length > 0 ? Math.min(100, (totalPredicted / allFixtures.length) * 100) : 100;

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-2)' }}>Loading fixtures...</div>
      </div>
    );
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title">⚽ Matches</h1>
        <p className="page-sub">World Cup 2026 · {currentStageInfo.label}</p>

        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Match predictions made</span>
            <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
              {totalPredicted} / {allFixtures.length} matches
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt}
              className={`btn btn-sm ${filter === opt ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(opt)}
              style={{ flexShrink: 0 }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Current round scoring banner */}
      <div style={{
        marginBottom: 16, padding: '10px 14px',
        background: 'rgba(0,255,106,0.05)', border: '1px solid rgba(0,255,106,0.15)',
        borderRadius: 'var(--radius-sm)',
      }}>
        <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.8 }}>
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{currentStageInfo.label}: </span>
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{currentStageInfo.pointsExact}pts</span> score ·{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{currentStageInfo.pointsResult}pts</span> result ·{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{currentStageInfo.pointsGD}pt</span> GD ·{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{currentStageInfo.pointsScorer}pts</span> 1st scorer
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>
          ⚡ 1 booster available each round (doubles points on 1 match)
        </div>
      </div>

      {/* Fixtures grouped by date */}
      {Object.keys(grouped).length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏟️</div>
          <h3>No matches here</h3>
          <p>Try a different filter</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, fixtures]) => (
          <div key={date} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
              position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)',
              backdropFilter: 'blur(10px)', padding: '8px 0', zIndex: 10,
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {date}
              </span>
              <div className="divider" style={{ flex: 1 }} />
            </div>
            {fixtures.map(fixture => (
              <MatchCard
                key={fixture.id}
                fixture={fixture}
                prediction={predictions[fixture.id]}
                onSave={savePrediction}
                isLocked={new Date(new Date(fixture.kickoff).getTime() - 5 * 60 * 1000) <= now}
                boosterApplied={boosters[fixture.stage || 'group'] === fixture.id}
                boosterAvailable={!boosters[fixture.stage || 'group'] || boosters[fixture.stage || 'group'] === fixture.id}
                onApplyBooster={(fid) => handleApplyBooster(fid, fixture.stage || 'group')}
                onRemoveBooster={() => handleRemoveBooster(fixture.stage || 'group')}
                allPredictions={allPredsByFixture[fixture.id] || []}
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
