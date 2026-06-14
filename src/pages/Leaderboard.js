// build-20260610
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { GROUP_STAGE_FIXTURES, SCORING } from '../data/fixtures';

// Mini sparkline component for points progression
function PositionGraph({ playerId, allPlayers }) {
  const maxLen = Math.max(...allPlayers.map(p => p.history.length), 0);
  if (maxLen < 2) return <p style={{ fontSize: 12, color: 'var(--text-3)', padding: '12px 0 4px' }}>Position chart loads after first results are in</p>;
  const n = allPlayers.length;
  const w = 280, h = 60, pad = 8;
  // Compute rank at each match index
  const positions = [];
  for (let i = 0; i < maxLen; i++) {
    const snap = allPlayers.map(p => ({
      id: p.id,
      pts: p.history[i]?.cumulative ?? (p.history[p.history.length - 1]?.cumulative ?? 0),
    })).sort((a, b) => b.pts - a.pts);
    const rank = snap.findIndex(s => s.id === playerId) + 1 || n;
    positions.push(rank);
  }
  // SVG: rank 1 = top (low y), rank n = bottom (high y)
  const pts = positions.map((rank, i) => ({
    x: pad + (i / (maxLen - 1)) * (w - pad * 2),
    y: n === 1 ? h / 2 : pad + ((rank - 1) / (n - 1)) * (h - pad * 2),
  }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const curRank = positions[positions.length - 1];
  return (
    <div style={{ padding: '12px 0 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <p style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Position in league</p>
        <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 16, color: 'var(--green)' }}>#{curRank} of {n}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 60 }}>
        <path d={path} fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--green)" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>
        <span>Match 1</span><span>Latest</span>
      </div>
    </div>
  );
}


function FormStrip({ form }) {
  if (!form?.length) return null;
  const last5 = form.slice(-5);
  const colors = { E: 'var(--green)', R: 'var(--amber)', W: 'var(--red)', '-': 'var(--surface-3)' };
  const labels = { E: 'S', R: 'R', W: '\u2717', '-': '-' };
  const titles = { E: 'Correct score', R: 'Correct result', W: 'Wrong', '-': 'No prediction' };
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {last5.map((f, i) => {
        const entry = typeof f === 'object' ? f : { r: f, s: false, b: false };
        return (
          <div key={i} title={titles[entry.r]} style={{ position: 'relative', width: 22, height: 22 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 4,
              background: colors[entry.r] || 'var(--surface-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700,
              color: entry.r === 'E' ? '#000' : entry.r === 'W' ? '#fff' : entry.r === 'R' ? '#000' : 'var(--text-2)',
            }}>
              {labels[entry.r]}
            </div>
            {entry.s && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                fontSize: 8, lineHeight: 1, pointerEvents: 'none',
              }} title="Correct first goalscorer">{'⚽'}</span>
            )}
            {entry.b && (
              <span style={{
                position: 'absolute', top: -6, left: -6,
                width: 13, height: 13, borderRadius: '50%',
                background: '#141414', border: '1.5px solid #282828',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, lineHeight: 1, pointerEvents: 'none',
              }} title="Goal Difference bonus">🤏</span>
            )}
          </div>
        );
      })}
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
      const [usersSnap, resultsSnap, predsSnap, leaguesSnap, tournamentResultsSnap, tournamentPredsSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'results')),
        getDocs(collection(db, 'predictions')),
        getDocs(query(collection(db, 'leagues'), where('memberIds', 'array-contains', user.id))),
        getDocs(collection(db, 'tournamentResults')), // set by admin when tournament ends
        getDocs(collection(db, 'tournamentPredictions')),
      ]);

      const users = {};
      usersSnap.forEach(d => { users[d.id] = { ...d.data(), id: d.id, points: 0, correctScores: 0, correctResults: 0, scorerPts: 0, gdBonus: 0, scorerHits: 0, form: [], history: [] }; });

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

      // Tournament results (set by admin after final)
      let tournamentResult = null;
      tournamentResultsSnap.forEach(d => { tournamentResult = d.data(); });

      // Tournament predictions by user
      const tournamentPreds = {};
      tournamentPredsSnap.forEach(d => { tournamentPreds[d.id] = d.data(); });

      // Calculate scores per match in kickoff order for form/history
      const sortedFixtures = [...GROUP_STAGE_FIXTURES].sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

      Object.keys(users).forEach(uid => {
        // Add tournament bonus points if tournament is complete
        if (tournamentResult) {
          const tp = tournamentPreds[uid];
          if (tp) {
            if (tp.winner && tp.winner === tournamentResult.winner) users[uid].points += 30;
            if (tp.runner_up && tp.runner_up === tournamentResult.runner_up) users[uid].points += 20;
            if (tp.third && tp.third === tournamentResult.third) users[uid].points += 10;
            if (tp.golden_boot && tp.golden_boot === tournamentResult.golden_boot) users[uid].points += 20;
          }
        }

        const userPreds = predsByUser[uid] || {};
        let cumulative = 0;

        sortedFixtures.forEach(fixture => {
          const result = results[fixture.id];
          const pred = userPreds[fixture.id];
          if (!result) return;

          if (!pred) {
            users[uid].form.push('-');
            users[uid].history.push({ cumulative, matchId: fixture.id });
            return;
          }

          const correctScore = pred.homeScore === result.home && pred.awayScore === result.away;
          const homeWin = result.home > result.away, awayWin = result.away > result.home, draw = result.home === result.away;
          const predHomeWin = pred.homeScore > pred.awayScore, predAwayWin = pred.awayScore > pred.homeScore, predDraw = pred.homeScore === pred.awayScore;
          const correctResult = (homeWin && predHomeWin) || (awayWin && predAwayWin) || (draw && predDraw);

          let pts = 0;
          const fe = { r: '-', s: false, b: false };
          if (correctScore) {
            pts += SCORING.EXACT_SCORE;
            users[uid].correctScores++;
            fe.r = 'E';
          } else {
            if (correctResult) {
              pts += SCORING.CORRECT_RESULT;
              users[uid].correctResults++;
              fe.r = 'R';
            } else {
              fe.r = 'W';
            }
            const actualGD = result.home - result.away;
            const predGD = Number(pred.homeScore) - Number(pred.awayScore);
            if (!isNaN(predGD) && actualGD === predGD) {
              pts += SCORING.GOAL_DIFFERENCE;
              fe.b = true;
              users[uid].gdBonus++;
            }
          }
          const noScorerMatch = result.firstGoalscorer === 'No goalscorer' && pred.firstGoalscorer === 'No goalscorer';
          const ownGoalMatch = result.firstGoalscorer === 'Own goal' && pred.firstGoalscorer === 'Own goal';
          const scorerMatch = result.firstGoalscorer && result.firstGoalscorer !== 'Own goal' && pred.firstGoalscorer === result.firstGoalscorer;
          if (noScorerMatch || ownGoalMatch || scorerMatch) {
            pts += SCORING.FIRST_GOALSCORER;
            users[uid].scorerPts += SCORING.FIRST_GOALSCORER;
            users[uid].scorerHits++;
            fe.s = true;
          }
          users[uid].form.push(fe);

          users[uid].points += pts;
          cumulative += pts;
          users[uid].history.push({ cumulative, matchId: fixture.id });
        });
      });

      const sorted = Object.values(users)
        .sort((a, b) => b.points - a.points);

      setPlayers(sorted);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadData(); }, [loadData]);

  function renderTable(playerList, showRank = true) {
    // Movement arrows: compare rank ONLY among players with >= 2 results
    // This avoids distortion from 0-prediction players sitting in the pool
    const activePlayers = playerList.filter(p => p.history.length >= 2);
    const prevRankMap = {};
    const currRankActive = {}; // rank within active-players subset
    activePlayers.forEach((p, i) => { currRankActive[p.id] = i + 1; });
    if (activePlayers.length >= 2) {
      const prevPts = activePlayers
        .map((p, i) => ({ id: p.id, pts: p.history[p.history.length - 2]?.cumulative ?? 0, origIdx: i }))
        .sort((a, b) => b.pts - a.pts || a.origIdx - b.origIdx);
      prevPts.forEach((p, i) => { prevRankMap[p.id] = i + 1; });
    }

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
        {/* Header row — 5 columns: move | # | player | pts | form */}
        <div style={{
          display: 'grid', gridTemplateColumns: '48px 1fr 52px 150px',
          padding: '8px 14px', borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)',
        }}>
          {[
            { label: '#', align: 'left' },
            { label: 'Player', align: 'left' },
            { label: 'Pts', align: 'center' },
            { label: 'Form', align: 'center', borderLeft: true },
          ].map(({ label, align, borderLeft }) => (
            <span key={label + align} style={{
              fontSize: 10, color: 'var(--text-3)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              textAlign: align,
              borderLeft: borderLeft ? '1px solid var(--border)' : undefined,
              paddingLeft: borderLeft ? 8 : undefined,
            }}>{label}</span>
          ))}
        </div>

        {playerList.map((player, idx) => {
          const rank = showRank ? idx + 1 : playerList.findIndex(p => p.id === player.id) + 1;
          const isMe = player.id === user.id;
          const isExpanded = expanded === player.id;
          // Movement: rank change within active players since last match
          const hasPrevData = player.history.length >= 2;
          const movArrow = (() => {
            if (!hasPrevData || !prevRankMap[player.id] || !currRankActive[player.id]) return null;
            const diff = prevRankMap[player.id] - currRankActive[player.id];
            if (diff > 0) return { label: `▲${diff}`, color: 'var(--green)' };
            if (diff < 0) return { label: `▼${Math.abs(diff)}`, color: 'var(--red)' };
            return { label: '◆', color: 'var(--text-3)' }; // no change — diamond neutral
          })();

          return (
            <div key={player.id}>
              <div
                onClick={() => setExpanded(isExpanded ? null : player.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr 52px 150px',
                  padding: '11px 14px', borderBottom: '1px solid var(--border)',
                  background: isMe ? 'rgba(0,255,106,0.04)' : undefined,
                  cursor: 'pointer', alignItems: 'center',
                  transition: 'background 0.1s',
                }}
              >
                {/* Rank + movement — single unit, left-aligned */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: rank <= 3 ? 'var(--green)' : 'var(--text-3)', lineHeight: 1 }}>
                    {rank}
                  </span>
                  {movArrow && (
                    <span style={{ fontSize: movArrow.label === '◆' ? 7 : 8, fontWeight: 800, color: movArrow.color, lineHeight: 1 }}>
                      {movArrow.label}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '100%', display: 'block' }}>{player.name}</span>
                  {isMe && <span style={{ fontSize: 10, color: 'var(--green)', marginLeft: 4 }}>you</span>}
                </div>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: 'var(--green)', textAlign: 'center' }}>{player.points}</span>
                <div style={{ display: 'flex', justifyContent: 'center', borderLeft: '1px solid var(--border)', paddingLeft: 10, paddingTop: 6, paddingBottom: 6, overflow: 'visible' }}>
                  <FormStrip form={player.form} />
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '4px 14px 14px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                  <PositionGraph playerId={player.id} allPlayers={playerList} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
                    {[
                      { label: 'Correct scores', value: player.correctScores },
                      { label: 'Correct results', value: player.correctResults },
                      { label: 'GD bonuses', value: player.gdBonus ?? 0 },
                      { label: '1st scorers', value: player.scorerHits ?? 0 },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'var(--surface-3)', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
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
  const myRank = displayPlayers.findIndex(p => p.id === user.id) + 1;

  if (loading) return <div className="page"><p style={{ color: 'var(--text-2)' }}>Calculating standings...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">📊 Rankings</h1>

      {/* My position card */}
      {myRank > 0 && (
        <div className="card card-green-border" style={{ marginBottom: 16, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{activeLeague ? 'Your League Position' : 'Your Position'}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{players.find(p => p.id === user.id)?.name || user.name}</div>
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
          💡 <strong style={{ color: 'var(--text)' }}>Tap any player</strong> to see their position chart and stat totals
        </p>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Form key · <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>last 5 matches</span></p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          {[
            { label: 'S', bg: 'var(--green)', color: '#000', desc: 'Correct Score' },
            { label: 'R', bg: 'var(--amber)', color: '#000', desc: 'Correct Result' },
            { label: '✗', bg: 'var(--red)', color: '#fff', desc: 'Wrong' },
            { label: '-', bg: 'var(--surface-3)', color: 'var(--text-3)', desc: 'No Prediction' },
          ].map(({ label, bg, color, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color }}>{label}</div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{desc}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bonus badges</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--surface-3)' }}></div>
              <span style={{ position: 'absolute', top: -6, left: -6, width: 13, height: 13, borderRadius: '50%', background: '#141414', border: '1.5px solid #282828', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, lineHeight: 1 }}>🤏</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Goal Difference bonus</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ position: 'relative', width: 22, height: 22, flexShrink: 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, background: 'var(--surface-3)' }}></div>
              <span style={{ position: 'absolute', top: -4, right: -4, fontSize: 9, lineHeight: 1 }}>⚽</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>1st Goalscorer</span>
          </div>
        </div>


      </div>
    </div>
  );
}
