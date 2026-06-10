// build-20260609
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(name, pin);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '48px 24px 40px',
      maxWidth: 380,
      margin: '0 auto',
    }}>

      {/* Logo */}
      <img src="/5aside-logo.svg" alt="5aside.com" style={{ width: 200, marginBottom: 20 }} />

      {/* Tournament badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,255,106,0.08)', border: '1px solid rgba(0,255,106,0.2)',
        borderRadius: 20, padding: '6px 14px', marginBottom: 40,
      }}>
        <span style={{ fontSize: 16 }}>🏆</span>
        <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          World Cup 2026 Predictor
        </span>
      </div>

      {/* Login form */}
      <div style={{ width: '100%', marginBottom: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, color: 'var(--text)' }}>Enter the game</h2>
        <p style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
          New? Pick any name and set a 4-digit PIN.<br />
          Returning? Use the same name &amp; PIN to pick up where you left off.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              maxLength={30}
              style={{ fontSize: 16 }}
            />
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 5, paddingLeft: 2 }}>
              Not case-sensitive — "Sam" and "sam" are the same
            </p>
          </div>
          <input
            className="input"
            type="password"
            inputMode="numeric"
            placeholder="4-digit PIN"
            value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            style={{ fontSize: 16, letterSpacing: '0.3em' }}
          />
          {error && <p style={{ color: 'var(--red)', fontSize: 13 }}>{error}</p>}
          <button
            className="btn btn-primary btn-lg btn-full"
            type="submit"
            disabled={loading || !name.trim() || pin.length < 4}
            style={{ marginTop: 4, fontSize: 15, fontWeight: 700 }}
          >
            {loading ? 'Loading...' : 'Play →'}
          </button>
        </form>
      </div>

      {/* How it works */}
      <div style={{
        width: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            How to score points
          </p>
        </div>

        {/* Points per round table */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10, fontWeight: 600 }}>
            Points per round
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['Round', 'Score', 'GD', 'Result', '⚽'].map((h, i) => (
                  <th key={h} style={{ textAlign: i === 0 ? 'left' : 'center', padding: '3px 4px 6px', color: 'var(--text-3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Group ←', 6, 1, 2, 3, true],
                ['R32', 8, 2, 3, 4, false],
                ['R16', 10, 3, 4, 5, false],
                ['QF', 12, 4, 5, 6, false],
                ['SF', 14, 5, 6, 7, false],
                ['Final', 16, 6, 7, 8, false],
              ].map(([round, score, gd, result, scorer, current]) => (
                <tr key={round} style={{ borderTop: '1px solid var(--border)', background: current ? 'rgba(0,255,106,0.04)' : undefined }}>
                  <td style={{ padding: '5px 4px', color: current ? 'var(--green)' : 'var(--text-2)', fontWeight: current ? 700 : 400, fontSize: 12 }}>{round}</td>
                  {[score, gd, result, scorer].map((v, j) => (
                    <td key={j} style={{ padding: '5px 4px', textAlign: 'center', fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>+{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tournament scoring */}
        <div style={{ padding: '12px 16px' }}>
          <p style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, fontWeight: 600 }}>
            Tournament predictions (locked before kick-off)
          </p>
          {[
            ['Tournament winner', '+30 pts'],
            ['Runner-up', '+20 pts'],
            ['Third place', '+10 pts'],
            ['Golden Boot', '+20 pts'],
          ].map(([label, pts]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6, marginBottom: 6, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>{pts}</span>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.5 }}>
            Lock in your tournament picks before the first match kicks off on 11 June. They can't be changed after.
          </p>
        </div>
      </div>

    </div>
  );
}
