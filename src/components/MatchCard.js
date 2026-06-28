// build-20260610
import React, { useState } from 'react';
import { getSquadOrdered } from '../data/squads';
import { SCORING } from '../data/fixtures';
import { STAGES } from '../data/knockoutFixtures';

export default function MatchCard({ fixture, prediction, onSave, isLocked, boosterApplied, onApplyBooster, onRemoveBooster, boosterAvailable, allPredictions = [] }) {
  const [homeScore, setHomeScore] = useState(prediction?.homeScore ?? '');
  const [awayScore, setAwayScore] = useState(prediction?.awayScore ?? '');
  const [scorer, setScorer] = useState(prediction?.firstGoalscorer ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(
    prediction?.homeScore !== undefined && prediction?.homeScore !== ''
  );

  const [showAllPicks, setShowAllPicks] = useState(false);
  const kickoff = new Date(fixture.kickoff);
  const now = new Date();
  const lockTime = new Date(kickoff.getTime() - 5 * 60 * 1000);
  const locked = isLocked || now >= lockTime;
  const hasResult = fixture.result != null;
  const kickedOff = now >= kickoff;
  const hasPrediction = prediction?.homeScore !== undefined && prediction?.homeScore !== '';
  const hasFullPrediction = homeScore !== '' && awayScore !== '' && scorer;

  const dateStr = kickoff.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeStr = kickoff.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' });

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

  // Stage-aware scoring
  const fixtureStage = fixture.stage || 'group';
  const S = fixtureStage === 'group' ? SCORING : (() => {
    const si = STAGES[fixtureStage];
    return si ? { EXACT_SCORE: si.pointsExact, CORRECT_RESULT: si.pointsResult, GOAL_DIFFERENCE: si.pointsGD, FIRST_GOALSCORER: si.pointsScorer } : SCORING;
  })();

  function getPoints() {
    if (!hasResult || !prediction || !hasPrediction) return null;
    let pts = 0;
    const correctScore = prediction.homeScore === fixture.result.home && prediction.awayScore === fixture.result.away;
    const homeWin = fixture.result.home > fixture.result.away;
    const awayWin = fixture.result.away > fixture.result.home;
    const draw = fixture.result.home === fixture.result.away;
    const predHomeWin = prediction.homeScore > prediction.awayScore;
    const predAwayWin = prediction.awayScore > prediction.homeScore;
    const predDraw = prediction.homeScore === prediction.awayScore;
    const correctResult = (homeWin && predHomeWin) || (awayWin && predAwayWin) || (draw && predDraw);
    // Goal difference bonus — only when not exact score
    const actualGD = fixture.result.home - fixture.result.away;
    const predGD = prediction.homeScore - prediction.awayScore;
    const correctGD = !correctScore && (actualGD === predGD);
    if (correctScore) pts += S.EXACT_SCORE;
    else if (correctResult) pts += S.CORRECT_RESULT;
    if (correctGD) pts += S.GOAL_DIFFERENCE;
    const noScorerMatch = fixture.result.firstGoalscorer === 'No goalscorer' && prediction.firstGoalscorer === 'No goalscorer';
    const ownGoalMatch = fixture.result.firstGoalscorer === 'Own goal' && prediction.firstGoalscorer === 'Own goal';
    const scorerMatch = fixture.result.firstGoalscorer && fixture.result.firstGoalscorer !== 'Own goal' && prediction.firstGoalscorer === fixture.result.firstGoalscorer;
    if (noScorerMatch || ownGoalMatch || scorerMatch) pts += S.FIRST_GOALSCORER;
    const finalPts = boosterApplied ? pts * 2 : pts;
    return { pts: finalPts, rawPts: pts, correctScore, correctResult, correctGD, boosted: boosterApplied && pts > 0 };
  }

  const pointsData = getPoints();

  // ── Status badge (top-right chip) ──────────────────────────────
  function StatusBadge() {
    if (hasResult) {
      if (!hasPrediction) return <span className="badge badge-gray">No prediction</span>;
      if (pointsData?.pts > 0) return <span className="badge badge-green">{pointsData.boosted ? '⚡' : ''}+{pointsData.pts}pts</span>;
      return <span className="badge badge-gray">0pts</span>;
    }
    if (kickedOff) return <span className="badge badge-gray">🔴 In progress</span>;
    if (locked) {
      if (hasPrediction) return <span className="badge badge-green">✓ Locked in</span>;
      return <span className="badge badge-gray">🔒 Locked</span>;
    }
    if (saved && hasPrediction) return <span className="badge badge-green">✓ Saved</span>;
    return null; // not yet predicted — no badge, use button to guide
  }

  // ── Save button label ──────────────────────────────────────────
  function saveButtonLabel() {
    if (saving) return 'Saving...';
    if (saved) return '✓ Saved — edit up to 5 mins before KO';
    if (homeScore !== '' && awayScore !== '' && !scorer) return 'Pick a scorer to save';
    if (homeScore !== '' || awayScore !== '') return 'Save prediction';
    return 'Enter a score to predict';
  }

  return (
    <div className={`match-card ${hasResult ? 'completed' : ''} ${locked && !hasResult ? 'locked' : ''}`}>

      {/* Header */}
      <div className="match-header">
        <div className="match-meta">
          <strong>{fixture.group ? `Group ${fixture.group}` : (STAGES[fixture.stage]?.shortLabel || 'R32')}</strong> · {dateStr} · {timeStr}
        </div>
        <StatusBadge />
      </div>

      <div className="match-body">
        {/* Teams + scores */}
        <div className="teams-row">
          <span className="team-name">{fixture.home}</span>

          {hasResult ? (
            // Show actual result
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Bebas Neue, sans-serif', minWidth: 28, textAlign: 'center', color: 'var(--green)' }}>
                {fixture.result.home}
              </span>
              <span className="score-dash">-</span>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Bebas Neue, sans-serif', minWidth: 28, textAlign: 'center', color: 'var(--green)' }}>
                {fixture.result.away}
              </span>
            </div>
          ) : locked ? (
            // Show locked prediction (or dashes if none)
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div className="score-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hasPrediction ? 0.8 : 0.35, fontFamily: 'Bebas Neue, sans-serif', fontSize: 22 }}>
                {hasPrediction ? prediction.homeScore : '–'}
              </div>
              <span className="score-dash">-</span>
              <div className="score-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hasPrediction ? 0.8 : 0.35, fontFamily: 'Bebas Neue, sans-serif', fontSize: 22 }}>
                {hasPrediction ? prediction.awayScore : '–'}
              </div>
            </div>
          ) : (
            // Editable inputs
            <div className="score-pair" style={{ flexShrink: 0 }}>
              <input
                className={`score-input ${homeScore !== '' ? 'filled' : ''}`}
                type="number" min="0" max="20"
                value={homeScore}
                onChange={e => { setHomeScore(e.target.value); setSaved(false); }}
                placeholder="0"
              />
              <span className="score-dash">-</span>
              <input
                className={`score-input ${awayScore !== '' ? 'filled' : ''}`}
                type="number" min="0" max="20"
                value={awayScore}
                onChange={e => { setAwayScore(e.target.value); setSaved(false); }}
                placeholder="0"
              />
            </div>
          )}

          <span className="team-name away">{fixture.away}</span>
        </div>

        {/* Scorer picker — only when not locked and no result */}
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
                <option value="No goalscorer">🚫 No goalscorer</option>
                <option value="Own goal">🙈 Own goal</option>
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

        {/* Locked summary — show their picks when locked, no result yet */}
        {locked && !hasResult && hasPrediction && (
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
            Your scorer pick: <strong style={{ color: 'var(--text)' }}>{prediction.firstGoalscorer || 'None picked'}</strong>
          </div>
        )}

        {/* Locked, no result, no prediction */}
        {locked && !hasResult && !hasPrediction && !kickedOff && (
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', fontStyle: 'italic' }}>
            Predictions closed 5 mins before kick-off
          </div>
        )}

        {/* Result breakdown — match finished, you predicted */}
        {hasResult && hasPrediction && (
          <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 8, fontSize: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span>
                Your prediction: <strong>{prediction.homeScore}–{prediction.awayScore}</strong>
                {pointsData?.correctScore && <span className="result-correct"> ✓ Correct score (+{SCORING.EXACT_SCORE})</span>}
                {!pointsData?.correctScore && pointsData?.correctResult && <span className="result-partial"> ✓ Correct result (+{SCORING.CORRECT_RESULT})</span>}
                {!pointsData?.correctScore && !pointsData?.correctResult && <span className="result-wrong"> ✗ Wrong</span>}
                {pointsData?.correctGD && <span className="result-correct"> · GD bonus (+{SCORING.GOAL_DIFFERENCE})</span>}
              </span>
              {prediction.firstGoalscorer && (
                <span>
                  1st Goalscorer: <strong>{prediction.firstGoalscorer}</strong>
                  {fixture.result.firstGoalscorer === prediction.firstGoalscorer
                    ? <span className="result-correct"> ✓ (+{SCORING.FIRST_GOALSCORER})</span>
                    : <span className="result-wrong"> ✗</span>}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Result in, no prediction */}
        {hasResult && !hasPrediction && (
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 8, fontStyle: 'italic' }}>
            You didn't predict this match
          </div>
        )}

        {/* Save button — only show when not locked and no result */}
        {!locked && !hasResult && (
          <div style={{ marginTop: 12 }}>
            <button
              className={`btn btn-full ${saved ? 'btn-primary' : hasFullPrediction ? 'btn-primary' : 'btn-ghost'}`}
              onClick={handleSave}
              disabled={!hasFullPrediction || saving}
              style={{ opacity: hasFullPrediction ? 1 : 0.5 }}
            >
              {saveButtonLabel()}
            </button>

            {/* Booster button */}
            {onApplyBooster && (boosterApplied || boosterAvailable) && (
              <button
                onClick={() => boosterApplied ? onRemoveBooster() : onApplyBooster(fixture.id)}
                style={{
                  marginTop: 8, width: '100%', padding: '8px 12px',
                  background: boosterApplied ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${boosterApplied ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 8, cursor: 'pointer',
                  color: boosterApplied ? '#FFD700' : 'var(--text-3)',
                  fontSize: 12, fontWeight: boosterApplied ? 700 : 400,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <span style={{ fontSize: 14 }}>⚡</span>
                {boosterApplied ? 'Booster applied — tap to remove' : 'Use booster on this match (2× all points)'}
              </button>
            )}
          </div>
        )}

        {/* Show booster badge on locked/completed matches */}
        {boosterApplied && (locked || hasResult) && (
          <div style={{ marginTop: 8, fontSize: 11, color: '#FFD700', display: 'flex', alignItems: 'center', gap: 4 }}>
            ⚡ Booster applied — all points doubled
          </div>
        )}

      </div>

      {/* All picks reveal — shown after kickoff */}
      {locked && allPredictions.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '8px 14px' }}>
          <button
            onClick={() => setShowAllPicks(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: 12, fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 10 }}>{showAllPicks ? '▲' : '▼'}</span>
            Everyone's predictions ({allPredictions.length})
          </button>
          {showAllPicks && (
            <div style={{ marginTop: 8 }}>
              {[...allPredictions]
                .sort((a, b) => (a.userName || '').localeCompare(b.userName || ''))
                .map((p, i) => (
                  <div key={p.userId || i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{p.userName || '?'}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-2)', fontWeight: 700 }}>{p.homeScore ?? '?'}{'–'}{p.awayScore ?? '?'}</span>
                      {p.firstGoalscorer ? <span style={{ color: 'var(--text-3)', fontSize: 11 }}>{'⚽'} {p.firstGoalscorer}</span> : null}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
