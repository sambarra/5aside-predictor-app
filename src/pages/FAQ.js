// build-20260610
import React, { useState } from 'react';
import { STAGES, GROUP_STAGE_SCORING } from '../data/knockoutFixtures';

const FAQS = [
  {
    q: 'How do I play?',
    a: 'Enter a name and 4-digit PIN to join. Then predict the scoreline of every World Cup match before it kicks off. Earn points for correct scores, correct results (win/draw/loss), and picking the first goalscorer. The more accurate your predictions, the higher you climb the standings.',
  },
  {
    q: 'When do predictions lock?',
    a: 'Predictions lock 5 minutes before each match kicks off (UK time). You can edit your prediction right up until that cutoff. For example, if a match kicks off at 20:00 UK time, predictions close at 19:55.',
  },
  {
    q: 'Can I predict all matches at once?',
    a: 'Yes — you can predict all 72 group stage matches in one go before the tournament starts. Each prediction locks individually 5 minutes before that match kicks off, so you can still predict later matches even after earlier ones have started.',
  },
  {
    q: 'What is the Goal Difference (GD) bonus?',
    a: "If your predicted goal difference matches the actual goal difference — but you didn't get the exact score — you earn a GD bonus. Example: result is 3-2 (GD +1) and you predicted 1-0 (also GD +1) — bonus awarded. It does not apply if you already got the correct score. Escalates each round: +1pt in group stage, up to +6pts in the Final.",
  },
  {
    q: 'What if I miss a match?',
    a: 'Missed predictions score 0 points for that match. There\'s no penalty beyond missing out — try to get your predictions in early.',
  },
  {
    q: 'How are points scored?',
    a: 'Points escalate each round. Correct score goes up +2 per round (from +6 in the group stage to +16 in the Final). All other categories go up +1 per round. There is also a Goal Difference bonus — see below.',
  },
  {
    q: 'What happens if a match goes to extra time or penalties?',
    a: 'Goals scored in extra time count — so if a match ends 1-1 after 90 minutes and one team scores in extra time to make it 2-1, the final score is 2-1. Penalty shootout goals do not count. If the match stays level through extra time and goes to a shootout, the score is recorded as the draw score at the end of extra time (e.g. 1-1). This is confirmed by how football-data.org reports results.',
  },
  {
    q: 'What are Tournament Predictions?',
    a: 'Before the first match kicks off (deadline: 19:55 UK time on 11 June), you can lock in four bonus predictions: Tournament Winner (+30pts), Runner-up (+20pts), Third Place (+10pts), and Golden Boot scorer (+20pts). These cannot be changed once submitted.',
  },
  {
    q: 'When do knockout rounds open for predictions?',
    a: 'Each knockout round opens once the previous round\'s fixtures are confirmed. An admin will activate each round — you\'ll see it appear in the Predict tab. There\'s usually a day or so between rounds to get your predictions in.',
  },
  {
    q: 'Do my predictions count across all leagues?',
    a: 'Yes — your predictions are the same everywhere. Whether you\'re in the global 5aside.com standings or one or more mini leagues, the same predictions count for all of them. You can\'t have different predictions for different leagues.',
  },
  {
    q: 'How do mini leagues work?',
    a: 'Go to the Leagues tab to create a private league or join one with a code. When you create a league you get a 5-character code to share with friends via WhatsApp. Anyone who enters the code joins your league and appears in your private standings alongside the global table.',
  },
  {
    q: 'How do I read the form strip?',
    a: 'The coloured squares next to each player show their last 5 match outcomes. S (green) = correct score. R (orange) = correct result (right winner/draw but wrong scoreline). ✗ (red) = wrong. – (grey) = no prediction submitted. Tap any player row to expand and see their full points progression graph.',
  },
  {
    q: 'How do I log back in?',
    a: 'Use the exact same name and PIN you used when you first joined. Names aren\'t case-sensitive — "Sam" and "sam" are treated the same.',
  },
  {
    q: 'I\'ve forgotten my PIN — what do I do?',
    a: 'Contact the league admin (Sam). Admins can look up your PIN in the Admin panel — go to Admin → Players → tap "Show PINs" and find your name. They\'ll be able to remind you.',
  },
  {
    q: 'When are scores updated?',
    a: 'Results update automatically once per day at midnight UK time. If an admin is watching the matches they may update results sooner using the manual refresh button in the Admin panel.',
  },
];

const SCORING_TABLE = [
  { stage: 'Group Stage', exact: GROUP_STAGE_SCORING.pointsExact, gd: GROUP_STAGE_SCORING.pointsGD, result: GROUP_STAGE_SCORING.pointsResult, scorer: GROUP_STAGE_SCORING.pointsScorer, current: true },
  ...Object.entries(STAGES).map(([, s]) => ({ stage: s.label, exact: s.pointsExact, gd: s.pointsGD, result: s.pointsResult, scorer: s.pointsScorer, current: false })),
];

export default function FAQ({ onBack }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="page">
      <h1 className="page-title">❓ How to Play</h1>
      <p className="page-sub">Everything you need to know</p>

      {/* Scoring table */}
      <div className="card" style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Points per round
          </p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['Round', 'Score', 'GD bonus', 'Result', 'Scorer'].map((h, i) => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: i === 0 ? 'left' : 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCORING_TABLE.map((row, i) => (
                <tr key={row.stage} style={{ borderTop: '1px solid var(--border)', background: row.current ? 'rgba(0,255,106,0.03)' : undefined }}>
                  <td style={{ padding: '8px 10px', fontWeight: row.current ? 700 : 400, color: row.current ? 'var(--green)' : 'var(--text)', fontSize: 12 }}>
                    {row.stage}{row.current ? ' ←' : ''}
                  </td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>+{row.exact}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: 'var(--amber)', fontSize: 13 }}>+{row.gd || 1}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>+{row.result}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: 700, color: 'var(--green)', fontSize: 13 }}>+{row.scorer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tournament bonus */}
      <div className="card" style={{ marginBottom: 24, padding: '12px 16px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Tournament bonus predictions</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[['🏆 Winner', '+30pts'], ['🥈 Runner-up', '+20pts'], ['🥉 Third place', '+10pts'], ['⚽ Golden Boot', '+20pts']].map(([label, pts]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
              <span style={{ color: 'var(--text-2)' }}>{label}</span>
              <span style={{ fontWeight: 700, color: 'var(--green)' }}>{pts}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8 }}>Lock in before 19:55 UK time on 11 June — can't be changed after.</p>
      </div>

      {/* FAQ accordion */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid var(--border)' : undefined }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', padding: '14px 16px', background: 'none', border: 'none',
                color: 'var(--text)', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{faq.q}</span>
              <span style={{ color: 'var(--green)', fontSize: 18, flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
