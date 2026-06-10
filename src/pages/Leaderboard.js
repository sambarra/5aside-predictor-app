// build-20260610
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { GROUP_STAGE_FIXTURES, SCORING } from '../data/fixtures';

// Mini sparkline component for points progression
function PointsGraph({ history }) {
  if (!history || history.length < 2) return <p style={{ fontSize: 12, color: 'var(--text-3)', padding: '12px 0' }}>Not enough data yet</p>;
  const max = Math.max(...history.map(h => h.cumulative), 1);
  const w = 280, h = 60, pad = 4;
  const pts = history.map((h, i) => ({
    x: pad + (i / (history.length - 1)) * (w - pad * 2),
    y: h + pad + ((max - h.cumulative) / max) * (h - pad * 2),
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  return (
    <div style={{ padding: '12px 0 4px' }}>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Points progression</p>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 60 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--green)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--green)" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>
        <span>Start</span><span>Now</span>
      </div>
    </div>
  );
}

// Form strip — last 5 match outcomes
function FormStrip({ form }) {
  if (!form?.length) return null;
  const last5 = form.slice(-5);
  const colors = { E: 'var(--green)', R: 'var(--amber)', W: 'var(--red)', '-': 'var(--surface-3)' };
  const labels = { E: 'S', R: 'R', W: '✗', '-': '-' };
  const titles = { E: 'Correct score (S)', R: 'Correct result (R)', W: 'Wrong', '-': 'No prediction' };
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {last5.map((f, i) => (
        <div key={i} title={titles[f]} style={{
          width: 20, height: 20, borderRadius: 4, background: colors[f] || 'var(--surface-3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 700, color: f === 'E' ? '#000' : '#fff',
        }}>
          {labels[f]}
        </div>
      ))}
    </div>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [myLeagues, setMyLeagues] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // null = will default to first mini league or global
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersSnap, resultsSnap, predsSnap, leaguesSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'results')),
        getDocs(collection(db, 'predictions')),
        getDocs(query(collection(db, 'leagues'), where('memberIds', 'array-contains', user.id))),
      ]);

      const users = {};
      usersSnap.forEach(d => { users[d.id] = { ...d.data(), id: d.id, points: 0, correctScores: 0, correctResults: 0, scorerPts: 0, form: [], history: [] }; });

      const results = {};
      resultsSnap.forEach(d => { results[d.id] = d.data(); });

      const predsByUser = {};
      predsSnap.forEach(d => {
        const data = d.data();
        if (!predsByUser[data.userId]) predsByUser[data.userId] = {};
        predsByUser[data.userId][data.fixtureId] = data;
      });

      const leagues = [];
      leaguesSnap.forEach(d => leagues.push({ id: d.id, ...d.data() }));
      setMyLeagues(leagues);

      // Calculate scores per match in kickoff order for form/history
      const sortedFixtures = [...GROUP_STAGE_FIXTURES].sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

      Object.keys(users).forEach(uid => {
        const userPreds = predsByUser[uid] || {};
        let cumulative = 0;

        sortedFixtures.forEach(fixture => {
          const result = results[fixture.id];
          const pred = userPreds[fixture.id];
          if (!result) return;

          if (!pred) {
            users[uid].form.push('-');
            return;
          }

          const correctScore = pred.homeScore === result.home && pred.awayScore === result.away;
          const homeWin = result.home > result.away, awayWin = result.away > result.home, draw = result.home === result.away;
          const predHomeWin = pred.homeScore > pred.awayScore, predAwayWin = pred.awayScore > pred.homeScore, predDraw = pred.homeScore === pred.awayScore;
          const correctResult = (homeWin && predHomeWin) || (awayWin && predAwayWin) || (draw && predDraw);

          let pts = 0;
          if (correctScore) { pts += SCORING.EXACT_SCORE; users[uid].correctScores++; users[uid].form.push('E'); }
          else if (correctResult) { pts += SCORING.CORRECT_RESULT; users[uid].correctResults++; users[uid].form.push('R'); }
          else { users[uid].form.push('W'); }

          if (result.firstGoalscorer && pred.firstGoalscorer === result.firstGoalscorer) {
            pts += SCORING.FIRST_GOALSCORER;
            users[uid].scorerPts += SCORING.FIRST_GOALSCORER;
          }

          users[uid].points += pts;
          cumulative += pts;
          users[uid].history.push({ cumulative, matchId: fixture.id });
        });
      });

      const sorted = Object.values(users)
        .filter(u => predsByUser[u.id])
        .sort((a, b) => b.points - a.points);

      setPlayers(sorted);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadData(); }, [loadData]);

  const myRank = players.findIndex(p => p.id === user.id) + 1;

  function renderTable(playerList, showRank = true) {
    if (playerList.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">🏟️</div>
          <h3>No scores yet</h3>
          <p>Standings update as results come in</p>
        </div>
      );
    }

    return (
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '32px 1fr 44px 80px',
          padding: '8px 14px', borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)',
        }}>
          {['#', 'Player', 'Pts', 'Form'].map((h, i) => (
            <span key={h} style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: i > 1 ? 'center' : 'left' }}>{h}</span>
          ))}
        </div>

        {playerList.map((player, idx) => {
          const rank = showRank ? idx + 1 : playerList.findIndex(p => p.id === player.id) + 1;
          const isMe = player.id === user.id;
          const isExpanded = expanded === player.id;

          return (
            <div key={player.id}>
              <div
                onClick={() => setExpanded(isExpanded ? null : player.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '32px 1fr 44px 80px',
                  padding: '11px 14px', borderBottom: '1px solid var(--border)',
                  background: isMe ? 'rgba(0,255,106,0.04)' : undefined,
                  cursor: 'pointer', alignItems: 'center',
                  transition: 'background 0.1s',
                }}
              >
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: rank <= 3 ? 'var(--green)' : 'var(--text-3)' }}>
                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                </span>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{player.name}</span>
                  {isMe && <span style={{ fontSize: 10, color: 'var(--green)', marginLeft: 6 }}>you</span>}

                </div>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'var(--green)', textAlign: 'center' }}>{player.points}</span>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <FormStrip form={player.form} />
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '4px 14px 14px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                  <PointsGraph history={player.history} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
                    {[
                      { label: 'Total pts', value: player.points },
                      { label: 'Correct scores', value: player.correctScores },
                      { label: 'Scorer pts', value: player.scorerPts },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'var(--surface-3)', borderRadius: 8, padding: '8px 10px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'var(--green)' }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Land on first mini league if user has one, else global — but 5aside.com is always leftmost
  const effectiveTab = activeTab ?? (myLeagues.length > 0 ? myLeagues[0].id : 'global');

  const tabs = [
    { id: 'global', label: '🌍 5aside.com' },
    ...myLeagues.map(l => ({ id: l.id, label: `🏆 ${l.name}` })),
  ];

  const activeLeague = myLeagues.find(l => l.id === effectiveTab);
  const displayPlayers = activeLeague
    ? players.filter(p => activeLeague.memberIds?.includes(p.id))
    : players;

  if (loading) return <div className="page"><p style={{ color: 'var(--text-2)' }}>Calculating standings...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">📊 Standings</h1>

      {/* My position card */}
      {myRank > 0 && (
        <div className="card card-green-border" style={{ marginBottom: 16, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your position</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{user.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--green)', lineHeight: 1 }}>#{myRank}</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{players.find(p => p.id === user.id)?.points ?? 0} pts</div>
          </div>
        </div>
      )}

      {/* League tabs */}
      {tabs.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`btn btn-sm ${effectiveTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ flexShrink: 0, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      {renderTable(displayPlayers)}

      {/* Tap hint + form key */}
      <div className="card" style={{ marginTop: 16, padding: '12px 16px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10 }}>
          💡 <strong style={{ color: 'var(--text)' }}>Tap any player</strong> to see their points progression graph and match-by-match stats
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Form key · <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>last 5 matches</span></p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12 }}>
          {[['S', 'var(--green)', '#000', 'Correct score'], ['R', 'var(--amber)', '#fff', 'Correct result'], ['✗', 'var(--red)', '#fff', 'Wrong'], ['-', 'var(--surface-3)', 'var(--text-3)', 'No prediction']].map(([label, bg, color, desc]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color, flexShrink: 0 }}>{label}</div>
              <span style={{ color: 'var(--text-2)' }}>{desc}</span>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}
