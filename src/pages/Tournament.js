import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { TOURNAMENT_PREDICTIONS_CONFIG, ALL_TEAMS } from '../data/fixtures';

const GOLDEN_BOOT_PLAYERS = [
  'Kylian Mbappé (France)', 'Erling Haaland (Norway)', 'Lionel Messi (Argentina)',
  'Vinicius Jr (Brazil)', 'Harry Kane (England)', 'Bukayo Saka (England)',
  'Phil Foden (England)', 'Jude Bellingham (England)', 'Lamine Yamal (Spain)',
  'Pedri (Spain)', 'Jamal Musiala (Germany)', 'Florian Wirtz (Germany)',
  'Kai Havertz (Germany)', 'Memphis Depay (Netherlands)', 'Cody Gakpo (Netherlands)',
  'Richarlison (Brazil)', 'Rodrygo (Brazil)', 'Raphinha (Brazil)',
  'Romelu Lukaku (Belgium)', 'Son Heung-min (South Korea)',
  'Darwin Núñez (Uruguay)', 'Luis Suárez (Uruguay)',
  'Dusan Vlahovic (Serbia)', 'Aleksandar Mitrovic (Serbia)',
  'Other',
];

const DEADLINE = new Date('2026-06-11T18:00:00+01:00'); // 2hrs before first match

export default function TournamentPredictions() {
  const { user } = useAuth();
  const [picks, setPicks] = useState({ winner: '', runner_up: '', third: '', golden_boot: '' });
  const [saved, setSaved] = useState(false);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocked(new Date() >= DEADLINE);
    loadPicks();
  // eslint-disable-next-line
  }, [user.id]);

  async function loadPicks() {
    try {
      const snap = await getDoc(doc(db, 'tournamentPredictions', user.id));
      if (snap.exists()) {
        setPicks(snap.data());
        setSaved(true);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!picks.winner || !picks.runner_up || !picks.third || !picks.golden_boot) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'tournamentPredictions', user.id), {
        ...picks,
        userId: user.id,
        userName: user.name,
        savedAt: new Date().toISOString(),
      });
      setSaved(true);
      setLocked(true); // Lock after submit
    } finally {
      setSaving(false);
    }
  }

  const allFilled = picks.winner && picks.runner_up && picks.third && picks.golden_boot;

  if (loading) return <div className="page"><p style={{ color: 'var(--text-2)' }}>Loading...</p></div>;

  return (
    <div className="page">
      <h1 className="page-title">🏆 Tournament Picks</h1>
      <p className="page-sub">Lock in your predictions before the tournament starts</p>

      {/* Deadline warning */}
      {!locked && (
        <div className="card card-green-border" style={{ marginBottom: 20, padding: '12px 16px' }}>
          <p style={{ fontSize: 13, color: 'var(--green)' }}>
            ⏰ <strong>Deadline:</strong> {DEADLINE.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} at{' '}
            {DEADLINE.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UK time
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
            Once submitted, these are locked. Points awarded at tournament end.
          </p>
        </div>
      )}

      {locked && saved && (
        <div className="card" style={{ marginBottom: 20, padding: '12px 16px', borderColor: 'var(--border-green)' }}>
          <p style={{ fontSize: 13, color: 'var(--green)' }}>🔒 Your tournament picks are locked in. Good luck!</p>
        </div>
      )}

      {locked && !saved && (
        <div className="card" style={{ marginBottom: 20, padding: '12px 16px' }}>
          <p style={{ fontSize: 13, color: 'var(--amber)' }}>⚠️ The deadline has passed. Tournament picks are now closed.</p>
        </div>
      )}

      {/* Points summary */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          Bonus points on offer
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {TOURNAMENT_PREDICTIONS_CONFIG.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>+{c.points}pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pick fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {TOURNAMENT_PREDICTIONS_CONFIG.map(config => (
          <div key={config.id} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{config.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{config.label}</div>
                <div style={{ fontSize: 12, color: 'var(--green)' }}>+{config.points} points if correct</div>
              </div>
              {saved && picks[config.id] && (
                <span className="badge badge-green" style={{ marginLeft: 'auto' }}>🔒</span>
              )}
            </div>

            {config.id === 'golden_boot' ? (
              <select
                className="input"
                value={picks.golden_boot}
                onChange={e => setPicks(p => ({ ...p, golden_boot: e.target.value }))}
                disabled={locked}
              >
                <option value="">Select a player...</option>
                {GOLDEN_BOOT_PLAYERS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            ) : (
              <select
                className="input"
                value={picks[config.id]}
                onChange={e => setPicks(p => ({ ...p, [config.id]: e.target.value }))}
                disabled={locked}
              >
                <option value="">Select a team...</option>
                {ALL_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Save button */}
      {!locked && (
        <div style={{ marginTop: 24 }}>
          <button
            className={`btn btn-lg btn-full ${allFilled ? 'btn-primary' : 'btn-ghost'}`}
            onClick={handleSave}
            disabled={!allFilled || saving}
          >
            {saving ? 'Locking in...' : saved ? '✓ Update & Lock Picks' : '🔒 Lock In My Picks'}
          </button>
          {!allFilled && (
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 8 }}>
              Fill in all four picks to submit
            </p>
          )}
        </div>
      )}
    </div>
  );
}
