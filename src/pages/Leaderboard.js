// build-20260609
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { GROUP_STAGE_FIXTURES, SCORING } from '../data/fixtures';

export default function Leaderboard() {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadLeaderboard(); }, []);

  async function loadLeaderboard() {
    setLoading(true);
    try {
      // Get all users
      const usersSnap = await getDocs(collection(db, 'users'));
      const users = {};
      usersSnap.forEach(d => { users[d.id] = { ...d.data(), id: d.id, points: 0, exactScores: 0, correctResults: 0, scorerPts: 0 }; });

      // Get all results
      const resultsSnap = await getDocs(collection(db, 'results'));
      const results = {};
      resultsSnap.forEach(d => { results[d.id] = d.data(); });

      // Get all predictions
      const predsSnap = await getDocs(collection(db, 'predictions'));
      const predsByUser = {};
      predsSnap.forEach(d => {
        const data = d.data();
        if (!predsByUser[data.userId]) predsByUser[data.userId] = {};
        predsByUser[data.userId][data.fixtureId] = data;
      });

      // Calculate scores
      Object.keys(users).forEach(uid => {
        const userPreds = predsByUser[uid] || {};
        Object.entries(results).forEach(([fixtureId, result]) => {
          const pred = userPreds[fixtureId];
          if (!pred) return;

          const correctScore = pred.homeScore === result.home && pred.awayScore === result.away;
          const homeWin = result.home > result.away;
          const awayWin = result.away > result.home;
          const draw = result.home === result.away;
          const predHomeWin = pred.homeScore > pred.awayScore;
          const predAwayWin = pred.awayScore > pred.homeScore;
          const predDraw = pred.homeScore === pred.awayScore;
          const correctResult = (homeWin && predHomeWin) || (awayWin && predAwayWin) || (draw && predDraw);

          if (correctScore) {
            users[uid].points += SCORING.EXACT_SCORE;
            users[uid].exactScores++;
          } else if (correctResult) {
            users[uid].points += SCORING.CORRECT_RESULT;
            users[uid].correctResults++;
          }

          if (result.firstGoalscorer && pred.firstGoalscorer === result.firstGoalscorer) {
            users[uid].points += SCORING.FIRST_GOALSCORER;
            users[uid].scorerPts += SCORING.FIRST_GOALSCORER;
          }
        });

        // Tournament bonus points
        // (Admin adds these manually via tournamentResults doc)
      });

      const sorted = Object.values(users)
        .filter(u => predsByUser[u.id]) // only show users who've predicted
        .sort((a, b) => b.points - a.points);

      setPlayers(sorted);
    } finally {
      setLoading(false);
    }
  }

  const myRank = players.findIndex(p => p.id === user.id) + 1;

  if (loading) return <div className="page"><p style={{ color: 'var(--text-2)' }}>Calculating scores...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">🥇 Leaderboard</h1>
      <p className="page-sub">World Cup 2026 · All players</p>

      {myRank > 0 && (
        <div className="card card-green-border" style={{ marginBottom: 16, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Your position</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{user.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--green)', lineHeight: 1 }}>
              #{myRank}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
              {players.find(p => p.id === user.id)?.points ?? 0} pts
            </div>
          </div>
        </div>
      )}

      {players.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏟️</div>
          <h3>No scores yet</h3>
          <p>The leaderboard will update once matches complete</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {players.map((player, idx) => {
            const rank = idx + 1;
            const isMe = player.id === user.id;
            return (
              <div
                key={player.id}
                className="lb-row"
                style={{ background: isMe ? 'rgba(0,255,106,0.04)' : undefined }}
              >
                <div className={`lb-rank ${rank <= 3 ? 'top' : ''}`}>
                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                </div>
                <div className="lb-name">
                  {player.name}
                  {isMe && <span style={{ fontSize: 11, color: 'var(--green)', marginLeft: 6 }}>you</span>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="lb-pts">{player.points}</div>
                  <div className="lb-pts-label">
                    {player.exactScores}✓ · {player.correctResults}~ · +{player.scorerPts}⚽
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scoring key */}
      <div className="card" style={{ marginTop: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Scoring
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Exact score</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+{SCORING.EXACT_SCORE}pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Correct result (W/D/L)</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+{SCORING.CORRECT_RESULT}pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>First goalscorer</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+{SCORING.FIRST_GOALSCORER}pts</span>
          </div>
          <div className="divider" style={{ margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Tournament winner</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+30pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Runner up</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+20pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Third place</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+10pts</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <span>Golden Boot</span><span style={{ color: 'var(--green)', fontWeight: 700 }}>+20pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
