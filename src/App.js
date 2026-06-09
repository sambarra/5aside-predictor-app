import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Fixtures from './pages/Fixtures';
import Tournament from './pages/Tournament';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';

// Icons
const IconFixtures = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
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
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const TABS = [
  { id: 'fixtures', label: 'Predict', Icon: IconFixtures },
  { id: 'tournament', label: 'Tournament', Icon: IconTrophy },
  { id: 'leaderboard', label: 'Standings', Icon: IconLeaderboard },
];

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
      <div className="top-bar">
        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdmin(false)}>← Back</button>
      </div>
      <Admin />
    </div>
  );

  return (
    <div>
      {/* Top bar */}
      <div className="top-bar">
        <div className="logo">5<span>aside</span> <span style={{ fontSize: 13, fontFamily: 'Inter', fontWeight: 600, color: 'var(--text-2)', letterSpacing: 0 }}>WC26</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{user.name}</span>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              if (window.confirm('Log out?')) logout();
            }}
            title="Log out"
          >
            <IconUser />
          </button>
        </div>
      </div>

      {/* Page content */}
      <div style={{ paddingTop: 8 }}>
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
        {/* Hidden admin access — triple tap the logo area or add ?admin to URL */}
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
