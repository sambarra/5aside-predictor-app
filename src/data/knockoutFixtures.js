// World Cup 2026 Knockout Stage - Pre-structured bracket
// Team slots filled by admin once group stage completes
// Based on FIFA WC2026 official bracket structure

export const STAGES = {
  r32: { label: 'Round of 32', shortLabel: 'R32', pointsExact: 7, pointsResult: 3, pointsScorer: 4, startDate: '2026-07-01' },
  r16: { label: 'Round of 16', shortLabel: 'R16', pointsExact: 8, pointsResult: 4, pointsScorer: 4, startDate: '2026-07-05' },
  qf:  { label: 'Quarter-finals', shortLabel: 'QF', pointsExact: 9, pointsResult: 5, pointsScorer: 5, startDate: '2026-07-10' },
  sf:  { label: 'Semi-finals', shortLabel: 'SF', pointsExact: 10, pointsResult: 6, pointsScorer: 5, startDate: '2026-07-14' },
  final: { label: 'Final', shortLabel: 'F', pointsExact: 11, pointsResult: 7, pointsScorer: 6, startDate: '2026-07-19' },
};

// Group stage scoring (for reference)
export const GROUP_STAGE_SCORING = {
  pointsExact: 6, pointsResult: 2, pointsScorer: 3,
};

// Pre-structured R32 bracket with placeholder descriptions
// admins replace homeTeam/awayTeam with actual team names
export const R32_BRACKET = [
  { id: 'R32_01', stage: 'r32', bracketSlot: '1A vs 2B', homeDesc: 'Winner Group A', awayDesc: 'Runner-up Group B' },
  { id: 'R32_02', stage: 'r32', bracketSlot: '1B vs 2A', homeDesc: 'Winner Group B', awayDesc: 'Runner-up Group A' },
  { id: 'R32_03', stage: 'r32', bracketSlot: '1C vs 2D', homeDesc: 'Winner Group C', awayDesc: 'Runner-up Group D' },
  { id: 'R32_04', stage: 'r32', bracketSlot: '1D vs 2C', homeDesc: 'Winner Group D', awayDesc: 'Runner-up Group C' },
  { id: 'R32_05', stage: 'r32', bracketSlot: '1E vs 2F', homeDesc: 'Winner Group E', awayDesc: 'Runner-up Group F' },
  { id: 'R32_06', stage: 'r32', bracketSlot: '1F vs 2E', homeDesc: 'Winner Group F', awayDesc: 'Runner-up Group E' },
  { id: 'R32_07', stage: 'r32', bracketSlot: '1G vs 2H', homeDesc: 'Winner Group G', awayDesc: 'Runner-up Group H' },
  { id: 'R32_08', stage: 'r32', bracketSlot: '1H vs 2G', homeDesc: 'Winner Group H', awayDesc: 'Runner-up Group G' },
  { id: 'R32_09', stage: 'r32', bracketSlot: '1I vs 2J', homeDesc: 'Winner Group I', awayDesc: 'Runner-up Group J' },
  { id: 'R32_10', stage: 'r32', bracketSlot: '1J vs 2I', homeDesc: 'Winner Group J', awayDesc: 'Runner-up Group I' },
  { id: 'R32_11', stage: 'r32', bracketSlot: '1K vs 2L', homeDesc: 'Winner Group K', awayDesc: 'Runner-up Group L' },
  { id: 'R32_12', stage: 'r32', bracketSlot: '1L vs 2K', homeDesc: 'Winner Group L', awayDesc: 'Runner-up Group K' },
  { id: 'R32_13', stage: 'r32', bracketSlot: '3rd best (A/B/C/D) vs 3rd best (E/F/G/H)', homeDesc: 'Best 3rd (ABCD)', awayDesc: 'Best 3rd (EFGH)' },
  { id: 'R32_14', stage: 'r32', bracketSlot: '3rd best vs 3rd best', homeDesc: 'Best 3rd (IJKL)', awayDesc: 'Best 3rd (ABEF)' },
  { id: 'R32_15', stage: 'r32', bracketSlot: '3rd best vs 3rd best', homeDesc: 'Best 3rd (CDIJ)', awayDesc: 'Best 3rd (GKHL)' },
  { id: 'R32_16', stage: 'r32', bracketSlot: '3rd best vs 3rd best', homeDesc: 'Best 3rd group', awayDesc: 'Best 3rd group' },
];

// Subsequent rounds — admin adds teams once known
// These are structural placeholders
export const KNOCKOUT_TEMPLATE = {
  r16: Array.from({length: 8}, (_, i) => ({
    id: `R16_${String(i+1).padStart(2,'0')}`,
    stage: 'r16',
    homeDesc: `Winner R32 Match ${(i*2)+1}`,
    awayDesc: `Winner R32 Match ${(i*2)+2}`,
  })),
  qf: Array.from({length: 4}, (_, i) => ({
    id: `QF_${String(i+1).padStart(2,'0')}`,
    stage: 'qf',
    homeDesc: `Winner R16 Match ${(i*2)+1}`,
    awayDesc: `Winner R16 Match ${(i*2)+2}`,
  })),
  sf: [
    { id: 'SF_01', stage: 'sf', homeDesc: 'Winner QF1', awayDesc: 'Winner QF2' },
    { id: 'SF_02', stage: 'sf', homeDesc: 'Winner QF3', awayDesc: 'Winner QF4' },
  ],
  final: [
    { id: 'FINAL', stage: 'final', homeDesc: 'Winner SF1', awayDesc: 'Winner SF2' },
  ],
};
