// build-20260609 
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Fixtures from './pages/Fixtures';
import Tournament from './pages/Tournament';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';

const IconFixtures = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
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
const IconMore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

const TABS = [
  { id: 'fixtures', label: 'Predict', Icon: IconFixtures },
  { id: 'tournament', label: 'Tournament', Icon: IconTrophy },
  { id: 'leaderboard', label: 'Standings', Icon: IconLeaderboard },
];
const TAB_ORDER = ['fixtures', 'tournament', 'leaderboard'];
const TAB_LABELS = { fixtures: 'Predict', tournament: 'Tournament', leaderboard: 'Standings' };

function MoreMenu({ onAdmin, onFAQ, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)',
      }} />
      <div style={{
        position: 'fixed', bottom: 72, right: 16, zIndex: 201,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', minWidth: 180, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        {[
          { icon: '❓', label: 'How to Play (FAQ)', action: onFAQ },
          { icon: '⚙️', label: 'Admin', action: onAdmin },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '14px 18px', background: 'none', border: 'none',
            color: 'var(--text)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            borderBottom: '1px solid var(--border)', textAlign: 'left',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

function AppInner() {
  const { user, logout, loading } = useAuth();
  const [tab, setTab] = useState('fixtures');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
      Loading...
    </div>
  );

  if (!user) return <Login />;

  if (showAdmin) return (
    <div>
      <div style={{ padding: '14px 16px 0', maxWidth: 600, margin: '0 auto' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdmin(false)}>← Back</button>
      </div>
      <Admin />
    </div>
  );

  if (showFAQ) return (
    <div>
      <div style={{ padding: '14px 16px 0', maxWidth: 600, margin: '0 auto' }}>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowFAQ(false)}>← Back</button>
      </div>
      <FAQ />
    </div>
  );

  const currentIdx = TAB_ORDER.indexOf(tab);
  const prevTab = currentIdx > 0 ? TAB_ORDER[currentIdx - 1] : null;
  const nextTab = currentIdx < TAB_ORDER.length - 1 ? TAB_ORDER[currentIdx + 1] : null;

  return (
    <div>
      {/* Top bar */}
      <div className="top-bar">
        <img src="/5aside-logo.svg" alt="5aside.com" style={{ height: 26, maxWidth: 130 }} />
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

      {/* Prev / Next nav strip — always 3 equal columns so centre is always centred */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', padding: '6px 16px', maxWidth: 600,
        margin: '6px auto 0', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => prevTab && setTab(prevTab)}
            disabled={!prevTab}
            style={{ opacity: prevTab ? 1 : 0, fontSize: 12, padding: '5px 10px', pointerEvents: prevTab ? 'auto' : 'none' }}
          >
            ← {prevTab ? TAB_LABELS[prevTab] : ''}
          </button>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {TAB_LABELS[tab]}
        </span>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => nextTab && setTab(nextTab)}
            disabled={!nextTab}
            style={{ opacity: nextTab ? 1 : 0, fontSize: 12, padding: '5px 10px', pointerEvents: nextTab ? 'auto' : 'none' }}
          >
            {nextTab ? TAB_LABELS[nextTab] : ''} →
          </button>
        </div>
      </div>

      {/* Page content */}
      <div style={{ paddingTop: 4 }}>
        {tab === 'fixtures' && <Fixtures />}
        {tab === 'tournament' && <Tournament />}
        {tab === 'leaderboard' && <Leaderboard />}
      </div>

      {/* More menu overlay */}
      {showMore && (
        <MoreMenu
          onAdmin={() => { setShowMore(false); setShowAdmin(true); }}
          onFAQ={() => { setShowMore(false); setShowFAQ(true); }}
          onClose={() => setShowMore(false)}
        />
      )}

      {/* Bottom tab nav — 4 items evenly spaced */}
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
          className={`tab-nav-item ${showMore ? 'active' : ''}`}
          onClick={() => setShowMore(m => !m)}
        >
          <IconMore />
          More
        </button>
      </nav>
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppInner /></AuthProvider>;
}
