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

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load user's predictions
      const predsQuery = query(collection(db, 'predictions'), where('userId', '==', user.id));
      const predsSnap = await getDocs(predsQuery);
      const predsMap = {};
      predsSnap.forEach(d => { predsMap[d.data().fixtureId] = d.data(); });
      setPredictions(predsMap);

      // Load results
      const resultsSnap = await getDocs(collection(db, 'results'));
      const resultsMap = {};
      resultsSnap.forEach(d => { resultsMap[d.id] = d.data(); });
      setResults(resultsMap);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadData(); }, [loadData]);

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

  const fixturesWithResults = GROUP_STAGE_FIXTURES.map(f => ({
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
  const upcoming = GROUP_STAGE_FIXTURES.filter(f => new Date(f.kickoff) > now).length;
  const progress = upcoming > 0 ? Math.min(100, (totalPredicted / GROUP_STAGE_FIXTURES.length) * 100) : 100;

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
        <h1 className="page-title">⚽ Fixtures</h1>
        <p className="page-sub">World Cup 2026 · Group Stage</p>

        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Match predictions made</span>
            <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
              {totalPredicted} / {GROUP_STAGE_FIXTURES.length} matches
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
        display: 'flex', gap: 12, marginBottom: 16, padding: '10px 14px',
        background: 'rgba(0,255,106,0.05)', border: '1px solid rgba(0,255,106,0.15)',
        borderRadius: 'var(--radius-sm)', alignItems: 'center',
      }}>
        <span style={{ fontSize: 16 }}>🏟️</span>
        <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--green)', fontSize: 12 }}>Group Stage: </strong>
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{GROUP_STAGE_SCORING.pointsExact}pts</span> correct score ·{' '}
          <span style={{ color: 'var(--amber)', fontWeight: 700 }}>+{GROUP_STAGE_SCORING.pointsGD}pt</span> GD bonus ·{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{GROUP_STAGE_SCORING.pointsResult}pts</span> correct result ·{' '}
          <span style={{ color: 'var(--green)', fontWeight: 700 }}>+{GROUP_STAGE_SCORING.pointsScorer}pts</span> first goalscorer
          <br/><span style={{ color: 'var(--text-3)', fontSize: 11 }}>GD bonus: same GD as result but not exact · ⚡ You have 1 booster this round — doubles all points on one match</span>
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
              />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
