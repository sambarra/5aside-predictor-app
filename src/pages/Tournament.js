import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { TOURNAMENT_PREDICTIONS_CONFIG, ALL_TEAMS } from '../data/fixtures';
import { SQUADS } from '../data/squads';

// Golden boot players now come from SQUADS data

const DEADLINE = new Date('2026-06-11T18:00:00+01:00'); // 2hrs before first match

// Searchable player picker for Golden Boot
function PlayerSearch({ value, onChange, disabled }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Build flat list of all players with team
  const allPlayers = Object.entries(SQUADS).flatMap(([team, players]) =>
    players.map(p => ({ label: `${p}`, sub: team, value: `${p} (${team})` }))
  );

  const filtered = query.length > 1
    ? allPlayers.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20)
    : [];

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function select(player) {
    onChange(player.value);
    setQuery(player.label);
    setOpen(false);
  }

  // Show selected value in input
  useEffect(() => {
    if (value && !query) {
      // Extract just the player name from "Name (Team)"
      setQuery(value.replace(/ \([^)]+\)$/, ''));
    }
  }, [value, query]);

  if (disabled && value) {
    return (
      <div className="input" style={{ opacity: 0.7, cursor: 'default', color: 'var(--text)' }}>
        {value}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <input
        className="input"
        type="text"
        placeholder="Type a player name or country..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); if (!e.target.value) onChange(''); }}
        onFocus={() => query.length > 1 && setOpen(true)}
        disabled={disabled}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: 'var(--surface-2)', border: '1px solid var(--border-green)',
          borderRadius: 'var(--radius-sm)', marginTop: 4,
          maxHeight: 240, overflowY: 'auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {filtered.map(p => (
            <div
              key={p.value}
              onMouseDown={() => select(p)}
              style={{
                padding: '9px 14px', cursor: 'pointer', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid var(--border)',
                background: value === p.value ? 'rgba(0,255,106,0.06)' : undefined,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = value === p.value ? 'rgba(0,255,106,0.06)' : ''}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{p.label}</span>
              <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>{p.sub}</span>
            </div>
          ))}
        </div>
      )}
      {open && query.length > 1 && filtered.length === 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', marginTop: 4,
          padding: '12px 14px', fontSize: 13, color: 'var(--text-3)',
        }}>
          No players found
        </div>
      )}
    </div>
  );
}


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
              <PlayerSearch
                value={picks.golden_boot}
                onChange={val => setPicks(p => ({ ...p, golden_boot: val }))}
                disabled={locked}
              />
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
