import React, { useState } from 'react';

function PodiumBlock({ place, name, points, height, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4, maxWidth: 92, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {name}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>{points} pts</div>
      <div style={{
        width: '100%', height,
        background: `linear-gradient(180deg, ${color}, ${color}99)`,
        borderRadius: '6px 6px 0 0',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8,
        fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: '#111', fontWeight: 800,
        animation: 'podium-rise 0.6s ease-out',
        boxShadow: '0 0 24px rgba(255,255,255,0.08)',
      }}>
        {place}
      </div>
    </div>
  );
}

function ConfettiLayer() {
  const pieces = Array.from({ length: 32 }, (_, i) => i);
  const colors = ['#00FF6A', '#FFD700', '#FF4444', '#4499FF', '#FF9933'];
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pieces.map(i => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.4;
        const duration = 2.6 + Math.random() * 2.2;
        const color = colors[i % colors.length];
        return (
          <div key={i} style={{
            position: 'absolute', top: -20, left: `${left}%`,
            width: 8, height: 14, background: color, borderRadius: 2,
            animation: `confetti-fall ${duration}s ${delay}s linear infinite`,
          }} />
        );
      })}
    </div>
  );
}

function PodiumSlide({ stats, onClose }) {
  const [p1, p2, p3] = stats.podium;
  return (
    <div style={{ textAlign: 'center', maxWidth: 440, position: 'relative', zIndex: 1 }}>
      <ConfettiLayer />
      <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 34, color: 'white', marginBottom: 24, letterSpacing: '0.02em' }}>
        🏆 Final Podium
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
        {p2 && <PodiumBlock place={2} name={p2.name} points={p2.points} height={90} color="#C0C0C0" />}
        {p1 && <PodiumBlock place={1} name={p1.name} points={p1.points} height={124} color="#FFD700" />}
        {p3 && <PodiumBlock place={3} name={p3.name} points={p3.points} height={68} color="#CD7F32" />}
      </div>
      <div style={{ fontSize: 16, color: 'white', marginBottom: 8, fontWeight: 600 }}>Thanks for playing! 🙌</div>
      <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28, lineHeight: 1.5 }}>
        See you for the 5aside.com<br />Premier League Predictor… coming soon 👋
      </div>
      <button onClick={onClose} className="btn btn-primary" style={{ padding: '12px 28px' }}>
        View Rankings →
      </button>
    </div>
  );
}

export default function CelebrationOverlay({ stats, onClose }) {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      emoji: '🏆',
      title: 'World Cup 2026 Predictor',
      subtitle: 'Final Standings',
      body: 'Tap to see the highlights',
    },
    {
      emoji: '🔥',
      title: stats.longestStreak.streak > 0 ? `${stats.longestStreak.streak} in a row` : 'No streak this year',
      subtitle: 'Longest correct-score streak',
      body: stats.longestStreak.streak > 0 ? stats.longestStreak.name : '',
    },
    {
      emoji: '📈',
      title: stats.mostImproved.climb > 0 ? `+${stats.mostImproved.climb} places` : '—',
      subtitle: 'Biggest climb since the group stage',
      body: stats.mostImproved.climb > 0 ? stats.mostImproved.name : '',
    },
    {
      emoji: '💥',
      title: stats.biggestHaul.points > 0 ? `${stats.biggestHaul.points} pts` : '—',
      subtitle: 'Biggest single-match haul',
      body: stats.biggestHaul.points > 0
        ? `${stats.biggestHaul.name}${stats.biggestHaul.label ? ' — ' + stats.biggestHaul.label : ''}`
        : '',
    },
    { podium: true },
  ];

  const s = slides[slide];

  function next() {
    if (slide >= slides.length - 1) { onClose(); return; }
    setSlide(sl => sl + 1);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.94)',
      zIndex: 1000, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
          width: 36, height: 36, color: 'white', fontSize: 18, cursor: 'pointer', zIndex: 2,
        }}
      >✕</button>

      <div style={{ display: 'flex', gap: 6, position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: i === slide ? 'var(--green)' : 'rgba(255,255,255,0.25)',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>

      {!s.podium ? (
        <div onClick={next} style={{ textAlign: 'center', cursor: 'pointer', maxWidth: 400 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{s.emoji}</div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 40, color: 'var(--green)', letterSpacing: '0.02em' }}>
            {s.title}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 8 }}>
            {s.subtitle}
          </div>
          {s.body && (
            <div style={{ fontSize: 22, fontWeight: 700, color: 'white', marginTop: 20 }}>
              {s.body}
            </div>
          )}
          <div style={{ marginTop: 40, fontSize: 12, color: 'var(--text-3)' }}>Tap to continue →</div>
        </div>
      ) : (
        <PodiumSlide stats={stats} onClose={onClose} />
      )}
    </div>
  );
}
