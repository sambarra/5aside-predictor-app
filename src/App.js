// build-20260610
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Fixtures from './pages/Fixtures';
import Tournament from './pages/Tournament';
import Leaderboard from './pages/Leaderboard';
import Admin from './pages/Admin';
import FAQ from './pages/FAQ';
import Leagues from './pages/Leagues';

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
const IconLeagues = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconMore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);

const TABS = [
  { id: 'fixtures', label: 'Matches', Icon: IconFixtures },
  { id: 'tournament', label: 'Tournament', Icon: IconTrophy },
  { id: 'leaderboard', label: 'Rankings', Icon: IconLeaderboard },
];

function MoreMenu({ onAdmin, onFAQ, onLeagues, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{
        position: 'fixed', bottom: 72, right: 16, zIndex: 201,
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', minWidth: 180, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}>
        {[
          { icon: '🏆', label: 'My Leagues', action: onLeagues },
          { icon: '❓', label: 'How to Play (FAQ)', action: onFAQ },
          { icon: '⚙️', label: 'Admin', action: onAdmin },
        ].map(item => (
          <button key={item.label} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '14px 18px', background: 'none', border: 'none',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text)', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left',
          }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

// Bottom nav always visible — shared across all views
function BottomNav({ tab, setTab, showMore, setShowMore, moreActive }) {
  return (
    <nav className="tab-nav">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`tab-nav-item ${!moreActive && tab === id ? 'active' : ''}`}
          onClick={() => setTab(id)}
        >
          <Icon />
          {label}
        </button>
      ))}
      <button
        className={`tab-nav-item ${showMore || moreActive ? 'active' : ''}`}
        onClick={() => setShowMore(m => !m)}
      >
        <IconMore />
        More
      </button>
    </nav>
  );
}

function AppInner() {
  const { user, logout, loading } = useAuth();
  const [tab, setTab] = useState('fixtures');
  const [showAdmin, setShowAdmin] = useState(false);
  // Show FAQ by default on first visit of session
  const [showFAQ, setShowFAQ] = useState(() => {
    try { return !localStorage.getItem('5aside_seen_faq'); } catch(e) { return true; }
  });
  const [showLeagues, setShowLeagues] = useState(false);
  const [showMore, setShowMore] = useState(false);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
      Loading...
    </div>
  );

  if (!user) return <Login />;

  // Top bar — always the same
  const TopBar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <a href="https://wc2026.5aside.com" style={{ display: 'block', textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--green)', background: 'rgba(0,255,106,0.08)', border: '1px solid rgba(0,255,106,0.2)', borderRadius: 8, padding: '6px 10px', margin: '10px 16px 0', textDecoration: 'none' }}>📌 This World Cup predictor now lives at wc2026.5aside.com — bookmark it here</a>
      <div className="top-bar">
        <a href="https://5aside.com" target="_blank" rel="noopener noreferrer"><img src="/5aside-logo.svg" alt="5aside.com" style={{ height: 26, maxWidth: 130 }} /></a>
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
    </div>
  );

  if (showLeagues) return (
    <div>
      <TopBar />
      <Leagues onBack={() => setShowLeagues(false)} />
      {showMore && (
        <MoreMenu
          onAdmin={() => { setShowMore(false); setShowAdmin(true); }}
          onFAQ={() => { setShowMore(false); setShowFAQ(true); }}
          onLeagues={() => { setShowMore(false); }}
          onClose={() => setShowMore(false)}
        />
      )}
      <BottomNav tab={tab} setTab={(t) => { setShowLeagues(false); setTab(t); }} showMore={showMore} setShowMore={setShowMore} moreActive={true} />
    </div>
  );

  if (showAdmin) return (
    <div>
      <TopBar />
      <Admin onBack={() => setShowAdmin(false)} />
      {showMore && (
        <MoreMenu
          onAdmin={() => { setShowMore(false); setShowAdmin(true); }}
          onFAQ={() => { setShowMore(false); setShowFAQ(true); }}
          onLeagues={() => { setShowMore(false); setShowLeagues(true); }}
          onClose={() => setShowMore(false)}
        />
      )}
      <BottomNav tab={tab} setTab={(t) => { setShowAdmin(false); setTab(t); }} showMore={showMore} setShowMore={setShowMore} moreActive={true} />
    </div>
  );

  if (showFAQ) return (
    <div>
      <TopBar />
      <FAQ onBack={() => (() => { try { localStorage.setItem('5aside_seen_faq', '1'); } catch(e) {} setShowFAQ(false); })()} />
      {showMore && (
        <MoreMenu
          onAdmin={() => { setShowMore(false); setShowAdmin(true); }}
          onFAQ={() => { setShowMore(false); }}
          onClose={() => setShowMore(false)}
        />
      )}
      <BottomNav tab={tab} setTab={(t) => { (() => { try { localStorage.setItem('5aside_seen_faq', '1'); } catch(e) {} setShowFAQ(false); })(); setTab(t); }} showMore={showMore} setShowMore={setShowMore} />
    </div>
  );

  return (
    <div>
      <TopBar />

      {/* Page content */}
      <div style={{ paddingTop: 4 }}>
        {tab === 'fixtures' && <Fixtures />}
        {tab === 'tournament' && <Tournament />}
        {tab === 'leaderboard' && <Leaderboard />}

        {tab === 'leagues' && <Leagues />}
      </div>

      {showMore && (
        <MoreMenu
          onAdmin={() => { setShowMore(false); setShowAdmin(true); }}
          onFAQ={() => { setShowMore(false); setShowFAQ(true); }}
          onLeagues={() => { setShowMore(false); setShowLeagues(true); }}
          onClose={() => setShowMore(false)}
        />
      )}

      <BottomNav tab={tab} setTab={setTab} showMore={showMore} setShowMore={setShowMore} moreActive={false} />
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppInner /></AuthProvider>;
}
