import React, { useState } from 'react';
import { STAGES, GROUP_STAGE_SCORING } from '../data/knockoutFixtures';

const FAQS = [
  {
    q: 'How do I play?',
    a: 'Enter a name and 4-digit PIN to join. Then predict the score of every match before kickoff. The better your predictions, the more points you earn. Compare your total on the Standings tab.',
  },
  {
    q: 'Can I predict all matches at once?',
    a: 'Yes — you can predict all group stage matches in one go before the tournament starts. Each prediction locks individually at kickoff time, so you can still predict later matches even if you missed an early one.',
  },
  {
    q: 'What if I miss a match?',
    a: 'Missed predictions score 0 points for that match. There\'s no penalty beyond missing out — so try to get your predictions in early.',
  },
  {
    q: 'How are points scored?',
    a: 'Points escalate each round to reward predicting the tougher matches correctly.',
  },
  {
    q: 'What happens in a penalty shootout?',
    a: 'Predict the score after 90 minutes (not including extra time or penalties). If the match goes to a shootout, the result is a draw at 90 minutes for scoring purposes.',
  },
  {
    q: 'What are Tournament Predictions?',
    a: 'Before the first match on 11 June, you can lock in four bonus predictions: Tournament Winner (+30pts), Runner-up (+20pts), Third Place (+10pts), and Golden Boot (+20pts). These can\'t be changed once submitted.',
  },
  {
    q: 'When do knockout rounds open for predictions?',
    a: 'Each knockout round opens once the previous round is complete and the fixtures are confirmed. An admin will activate each round — you\'ll see it appear in the Predict tab.',
  },
  {
    q: 'How do I log back in?',
    a: 'Use the exact same name and PIN you used when you first joined. Names aren\'t case-sensitive — "Sam" and "sam" both work.',
  },
  {
    q: 'Can I change my PIN?',
    a: 'Not currently — your PIN is set when you first register. Make sure to remember it.',
  },
];

const SCORING_TABLE = [
  { stage: 'Group Stage', exact: GROUP_STAGE_SCORING.pointsExact, result: GROUP_STAGE_SCORING.pointsResult, scorer: GROUP_STAGE_SCORING.pointsScorer },
  ...Object.entries(STAGES).map(([, s]) => ({ stage: s.label, exact: s.pointsExact, result: s.pointsResult, scorer: s.pointsScorer })),
];

export default function FAQ() {
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
                <th style={{ padding: '8px 14px', textAlign: 'left', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Round</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>Exact</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>Result</th>
                <th style={{ padding: '8px 10px', textAlign: 'center', color: 'var(--text-3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>Scorer</th>
              </tr>
            </thead>
            <tbody>
              {SCORING_TABLE.map((row, i) => (
                <tr key={row.stage} style={{ borderTop: '1px solid var(--border)', background: i === 0 ? 'rgba(0,255,106,0.03)' : undefined }}>
                  <td style={{ padding: '9px 14px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? 'var(--green)' : 'var(--text)' }}>
                    {row.stage} {i === 0 ? '← current' : ''}
                  </td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', fontWeight: 700, color: 'var(--green)' }}>+{row.exact}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', fontWeight: 700, color: 'var(--green)' }}>+{row.result}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', fontWeight: 700, color: 'var(--green)' }}>+{row.scorer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
