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
    <div className="login-screen">
      {/* Logo */}
      <img
        src="/5aside-logo.svg"
        alt="5aside.com"
        style={{ width: 220, marginBottom: 8 }}
      />
      <p style={{ color: 'var(--green)', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32 }}>
        World Cup 2026 Predictor
      </p>

      <div className="login-form">
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, color: 'var(--text)' }}>Enter the game</p>
        <p style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
          New? Pick a name and set a PIN. <br />Returning? Use the same name & PIN.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            className="input"
            type="text"
            placeholder="Your name (e.g. Sam)"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
            maxLength={30}
          />
          <input
            className="input"
            type="password"
            inputMode="numeric"
            placeholder="4-digit PIN"
            value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
          />
          {error && (
            <p style={{ color: 'var(--red)', fontSize: 13, textAlign: 'left' }}>{error}</p>
          )}
          <button
            className="btn btn-primary btn-lg btn-full"
            type="submit"
            disabled={loading || !name.trim() || pin.length < 4}
          >
            {loading ? 'Loading...' : 'Play →'}
          </button>
        </form>

        <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: '1.6' }}>
            🏆 Predict every World Cup match score.<br />
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>+5pts</span> exact score ·{' '}
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>+2pts</span> correct result ·{' '}
            <span style={{ color: 'var(--green)', fontWeight: 600 }}>+3pts</span> first goalscorer
          </p>
        </div>
      </div>
    </div>
  );
}
