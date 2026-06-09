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
      <div className="login-logo">
        5<span>aside</span>
      </div>
      <p className="login-sub">World Cup 2026 Predictor</p>

      <div className="login-form">
        <p className="login-form-title">Enter the game</p>
        <p style={{ color: 'var(--text-2)', fontSize: '13px', marginBottom: '8px' }}>
          New here? Just pick a name and set a PIN. Returning? Use the same name & PIN.
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
            <p style={{ color: 'var(--red)', fontSize: '13px', textAlign: 'left' }}>{error}</p>
          )}
          <button
            className="btn btn-primary btn-lg btn-full"
            type="submit"
            disabled={loading || !name.trim() || pin.length < 4}
          >
            {loading ? 'Loading...' : 'Play'}
          </button>
        </form>

        <div style={{ marginTop: '24px', padding: '14px', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.5' }}>
            🏆 <strong style={{ color: 'var(--text)' }}>How it works:</strong> Predict the score of every World Cup match. 
            Earn <strong style={{ color: 'var(--green)' }}>5pts</strong> for exact scores, 
            <strong style={{ color: 'var(--green)' }}> 2pts</strong> for correct results, 
            <strong style={{ color: 'var(--green)' }}> 3pts</strong> for first goalscorer.
          </p>
        </div>
      </div>
    </div>
  );
}
