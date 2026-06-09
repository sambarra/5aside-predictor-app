import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Fixtures from './pages/Fixtures';
import Tournament from './pages/Tournament';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';

const IconFixtures = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4a2 2 0 0 1-2-2V5h4"/><path d="M18 9h2a2 2 0 0 0 2-2V5h-4"/>
    <path d="M12 17v4"/><path d="M8 21h8"/><path d="M6 3h12v10a6 6 0 0 1-12 0Z"/>
  </svg>
);
const IconLeaderboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
  </svg>
);

const TABS = [
  { id: 'fixtures', label: 'Predict', Icon: IconFixtures },
  { id: 'tournament', label: 'Tournament', Icon: IconTrophy },
  { id: 'leaderboard', label: 'Standings', Icon: IconLeaderboard },
];

const TAB_ORDER = ['fixtures', 'tournament', 'leaderboard'];

function AppInner() {
  const { user, logout, loading } = useAuth();
  const [tab, setTab] = useState('fixtures');
  const [showAdmin, setShowAdmin] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
        Loading...
      </div>
    );
  }

  if (!user) return <Login />;

  if (showAdmin) return (
    <div>
      <div className="top-bar" style={{ marginBottom: 8 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdmin(false)}>← Back</button>
      </div>
      <Admin />
    </div>
  );

  const currentIdx = TAB_ORDER.indexOf(tab);
  const prevTab = currentIdx > 0 ? TAB_ORDER[currentIdx - 1] : null;
  const nextTab = currentIdx < TAB_ORDER.length - 1 ? TAB_ORDER[currentIdx + 1] : null;
  const tabLabels = { fixtures: 'Predict', tournament: 'Tournament', leaderboard: 'Standings' };

  return (
    <div>
      {/* Top bar */}
      <div className="top-bar">
        <img
          src="/5aside-logo.svg"
          alt="5aside.com"
          style={{ height: 28, maxWidth: 140 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {user.name}
          </span>
          <button
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px 10px', fontSize: 12 }}
            onClick={() => { if (window.confirm('Log out?')) logout(); }}
          >
            Log out
          </button>
        </div>
      </div>

      {/* Prev / Next nav strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 16px',
        maxWidth: 600,
        margin: '0 auto',
        borderBottom: '1px solid var(--border)',
        marginTop: 6,
      }}>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => prevTab && setTab(prevTab)}
          disabled={!prevTab}
          style={{ opacity: prevTab ? 1 : 0.2, fontSize: 12, padding: '5px 10px' }}
        >
          ← {prevTab ? tabLabels[prevTab] : ''}
        </button>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {tabLabels[tab]}
        </span>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => nextTab && setTab(nextTab)}
          disabled={!nextTab}
          style={{ opacity: nextTab ? 1 : 0.2, fontSize: 12, padding: '5px 10px' }}
        >
          {nextTab ? tabLabels[nextTab] : ''} →
        </button>
      </div>

      {/* Page content */}
      <div style={{ paddingTop: 4 }}>
        {tab === 'fixtures' && <Fixtures />}
        {tab === 'tournament' && <Tournament />}
        {tab === 'leaderboard' && <Leaderboard />}
      </div>

      {/* Bottom tab nav */}
      <nav className="tab-nav">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`tab-nav-item ${tab === id ? 'active' : ''}`}
            onClick={() => setTab(id)}
          >
            <Icon />
            {label}
          </button>
        ))}
        <button
          className="tab-nav-item"
          onClick={() => setShowAdmin(true)}
          style={{ maxWidth: 50 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 1 0 4.93 19.07"/>
          </svg>
          Admin
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
