import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { GROUP_STAGE_FIXTURES } from '../data/fixtures';

const ADMIN_PIN = '5aside2026'; // Change this to whatever you want

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [results, setResults] = useState({});
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ home: '', away: '', firstGoalscorer: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (authed) loadResults();
  }, [authed]);

  async function loadResults() {
    const snap = await getDocs(collection(db, 'results'));
    const map = {};
    snap.forEach(d => { map[d.id] = d.data(); });
    setResults(map);
  }

  async function saveResult() {
    if (!selected || form.home === '' || form.away === '') return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'results', selected), {
        home: parseInt(form.home),
        away: parseInt(form.away),
        firstGoalscorer: form.firstGoalscorer,
        enteredAt: new Date().toISOString(),
      });
      setResults(prev => ({ ...prev, [selected]: { home: parseInt(form.home), away: parseInt(form.away), firstGoalscorer: form.firstGoalscorer } }));
      setMsg('✓ Result saved');
      setTimeout(() => setMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  }

  function selectFixture(id) {
    setSelected(id);
    const existing = results[id];
    if (existing) {
      setForm({ home: existing.home, away: existing.away, firstGoalscorer: existing.firstGoalscorer || '' });
    } else {
      setForm({ home: '', away: '', firstGoalscorer: '' });
    }
    setMsg('');
  }

  if (!authed) {
    return (
      <div className="page" style={{ maxWidth: 400 }}>
        <h1 className="page-title">Admin</h1>
        <p className="page-sub">Enter admin PIN to continue</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="input"
            type="password"
            placeholder="Admin PIN"
            value={pinInput}
            onChange={e => setPinInput(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => { if (pinInput === ADMIN_PIN) setAuthed(true); else alert('Wrong PIN'); }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  const now = new Date();
  const completedFixtures = GROUP_STAGE_FIXTURES.filter(f => new Date(f.kickoff) < now);

  return (
    <div className="page">
      <h1 className="page-title">⚙️ Admin</h1>
      <p className="page-sub">Enter match results to update scores</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div className="card" style={{ flex: 1, minWidth: 120, padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--green)' }}>{Object.keys(results).length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Results entered</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 120, padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: 'var(--amber)' }}>{completedFixtures.length - Object.keys(results).length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)' }}>Awaiting entry</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
        {/* Fixture list */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Kicked off
          </p>
          <div className="card" style={{ padding: 0, maxHeight: 400, overflowY: 'auto' }}>
            {completedFixtures.length === 0 && (
              <p style={{ padding: 16, color: 'var(--text-2)', fontSize: 14 }}>No matches kicked off yet</p>
            )}
            {completedFixtures.map(f => {
              const hasResult = !!results[f.id];
              return (
                <div
                  key={f.id}
                  onClick={() => selectFixture(f.id)}
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    background: selected === f.id ? 'rgba(0,255,106,0.06)' : undefined,
                    borderLeft: selected === f.id ? '2px solid var(--green)' : '2px solid transparent',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {f.home} vs {f.away}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Gr {f.group} · {new Date(f.kickoff).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                    {hasResult
                      ? <span style={{ color: 'var(--green)' }}>{results[f.id].home}–{results[f.id].away} ✓</span>
                      : <span style={{ color: 'var(--amber)' }}>No result</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Result form */}
        {selected && (
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Enter result
            </p>
            <div className="card">
              {(() => {
                const f = GROUP_STAGE_FIXTURES.find(x => x.id === selected);
                return (
                  <>
                    <p style={{ fontWeight: 700, marginBottom: 14 }}>{f.home} vs {f.away}</p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>{f.home}</label>
                        <input className="input" type="number" min="0" max="20" value={form.home} onChange={e => setForm(p => ({ ...p, home: e.target.value }))} placeholder="0" />
                      </div>
                      <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-3)', paddingTop: 18 }}>–</span>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>{f.away}</label>
                        <input className="input" type="number" min="0" max="20" value={form.away} onChange={e => setForm(p => ({ ...p, away: e.target.value }))} placeholder="0" />
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>First goalscorer (exact name)</label>
                      <input className="input" type="text" value={form.firstGoalscorer} onChange={e => setForm(p => ({ ...p, firstGoalscorer: e.target.value }))} placeholder="e.g. Kylian Mbappé" />
                    </div>
                    {msg && <p style={{ color: 'var(--green)', fontSize: 13, marginBottom: 10 }}>{msg}</p>}
                    <button
                      className="btn btn-primary btn-full"
                      onClick={saveResult}
                      disabled={saving || form.home === '' || form.away === ''}
                    >
                      {saving ? 'Saving...' : 'Save Result'}
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
