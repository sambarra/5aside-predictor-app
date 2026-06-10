// build-20260609
import React, { useState } from 'react';
import { getSquadOrdered } from '../data/squads';

export default function MatchCard({ fixture, prediction, onSave, isLocked }) {
  const [homeScore, setHomeScore] = useState(prediction?.homeScore ?? '');
  const [awayScore, setAwayScore] = useState(prediction?.awayScore ?? '');
  const [scorer, setScorer] = useState(prediction?.firstGoalscorer ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!prediction?.homeScore !== undefined && prediction?.homeScore !== '');

  const kickoff = new Date(fixture.kickoff);
  const now = new Date();
  const lockTime = new Date(kickoff.getTime() - 5 * 60 * 1000);
  const locked = isLocked || now >= lockTime;
  const hasFullPrediction = homeScore !== '' && awayScore !== '' && scorer;

  const dateStr = kickoff.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeStr = kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  async function handleSave() {
    if (!hasFullPrediction) return;
    setSaving(true);
    try {
      await onSave(fixture.id, {
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        firstGoalscorer: scorer,
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  // Show result if match has result
  const hasResult = fixture.result != null;

  function getPoints() {
    if (!hasResult || !prediction) return null;
    let pts = 0;
    const correctScore = prediction.homeScore === fixture.result.home && prediction.awayScore === fixture.result.away;
    const homeWin = fixture.result.home > fixture.result.away;
    const awayWin = fixture.result.away > fixture.result.home;
    const draw = fixture.result.home === fixture.result.away;
    const predHomeWin = prediction.homeScore > prediction.awayScore;
    const predAwayWin = prediction.awayScore > prediction.homeScore;
    const predDraw = prediction.homeScore === prediction.awayScore;
    const correctResult = (homeWin && predHomeWin) || (awayWin && predAwayWin) || (draw && predDraw);

    if (correctScore) pts += 5;
    else if (correctResult) pts += 2;
    if (fixture.result.firstGoalscorer && prediction.firstGoalscorer === fixture.result.firstGoalscorer) pts += 3;

    return { pts, correctScore, correctResult };
  }

  const pointsData = getPoints();

  return (
    <div className={`match-card ${pointsData ? 'completed' : ''} ${locked && !hasResult ? 'locked' : ''}`}>
      <div className="match-header">
        <div className="match-meta">
          <strong>Group {fixture.group}</strong> · {dateStr} · {timeStr}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {locked && !hasResult && <span className="badge badge-gray">🔒 Locked</span>}
          {pointsData && (
            <span className={`badge ${pointsData.pts > 0 ? 'badge-green' : 'badge-gray'}`}>
              {pointsData.pts}pts
            </span>
          )}
          {!locked && saved && !hasResult && <span className="badge badge-green">✓ Saved</span>}
        </div>
      </div>

      <div className="match-body">
        {/* Teams + score */}
        <div className="teams-row">
          <span className="team-name">{fixture.home}</span>
          {hasResult ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Bebas Neue, sans-serif', minWidth: 28, textAlign: 'center' }}>
                {fixture.result.home}
              </span>
              <span className="score-dash">-</span>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Bebas Neue, sans-serif', minWidth: 28, textAlign: 'center' }}>
                {fixture.result.away}
              </span>
            </div>
          ) : locked ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div className="score-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                {prediction?.homeScore ?? '?'}
              </div>
              <span className="score-dash">-</span>
              <div className="score-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                {prediction?.awayScore ?? '?'}
              </div>
            </div>
          ) : (
            <div className="score-pair" style={{ flexShrink: 0 }}>
              <input
                className={`score-input ${homeScore !== '' ? 'filled' : ''}`}
                type="number"
                min="0"
                max="20"
                value={homeScore}
                onChange={e => { setHomeScore(e.target.value); setSaved(false); }}
                placeholder="0"
              />
              <span className="score-dash">-</span>
              <input
                className={`score-input ${awayScore !== '' ? 'filled' : ''}`}
                type="number"
                min="0"
                max="20"
                value={awayScore}
                onChange={e => { setAwayScore(e.target.value); setSaved(false); }}
                placeholder="0"
              />
            </div>
          )}
          <span className="team-name away">{fixture.away}</span>
        </div>

        {/* Goalscorer */}
        {!hasResult && !locked && (
          <div className="match-fields">
            <div className="field-row">
              <span className="field-label">⚽ 1st Scorer</span>
              <select
                className="input"
                value={scorer}
                onChange={e => { setScorer(e.target.value); setSaved(false); }}
                style={{ flex: 1 }}
              >
                <option value="">Pick a player...</option>
                <optgroup label={`⚽ ${fixture.home}`}>
                  {getSquadOrdered(fixture.home).map(p => (
                    <option key={p.name} value={p.name}>[{p.pos}] {p.name}</option>
                  ))}
                </optgroup>
                <optgroup label={`⚽ ${fixture.away}`}>
                  {getSquadOrdered(fixture.away).map(p => (
                    <option key={p.name} value={p.name}>[{p.pos}] {p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        )}

        {/* Locked prediction summary */}
        {locked && !hasResult && prediction && (
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8 }}>
            Your pick: <strong style={{ color: 'var(--text)' }}>{prediction.firstGoalscorer || 'No scorer picked'}</strong>
          </div>
        )}

        {/* Result breakdown */}
        {hasResult && prediction && (
          <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 8, fontSize: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span>
                Your score: <strong>{prediction.homeScore}-{prediction.awayScore}</strong>
                {pointsData?.correctScore && <span className="result-correct"> ✓ Exact (+5)</span>}
                {!pointsData?.correctScore && pointsData?.correctResult && <span className="result-partial"> ✓ Result (+2)</span>}
                {!pointsData?.correctScore && !pointsData?.correctResult && <span className="result-wrong"> ✗ Wrong</span>}
              </span>
              <span>
                Scorer: <strong>{prediction.firstGoalscorer}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Save button */}
        {!locked && !hasResult && (
          <div style={{ marginTop: 12 }}>
            <button
              className={`btn btn-full ${hasFullPrediction ? 'btn-primary' : 'btn-ghost'}`}
              onClick={handleSave}
              disabled={!hasFullPrediction || saving}
            >
              {saving ? 'Saving...' : saved ? '✓ Prediction Saved' : 'Save Prediction'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
