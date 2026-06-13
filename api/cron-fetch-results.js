// build-20260609
// Vercel Cron Job - runs every hour automatically
// Fetches completed World Cup results and saves to Firestore
// Schedule defined in vercel.json

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// All WC2026 group stage fixtures for team name matching
const FIXTURES = [
  { id: 'GS001', home: 'Mexico', away: 'South Africa' },
  { id: 'GS002', home: 'South Korea', away: 'Czech Republic' },
  { id: 'GS003', home: 'Canada', away: 'Bosnia-Herzegovina' },
  { id: 'GS004', home: 'Qatar', away: 'Switzerland' },
  { id: 'GS005', home: 'Brazil', away: 'Morocco' },
  { id: 'GS006', home: 'United States', away: 'Paraguay' },
  { id: 'GS007', home: 'Haiti', away: 'Scotland' },
  { id: 'GS008', home: 'Australia', away: 'Turkey' },
  { id: 'GS009', home: 'Germany', away: 'Curaçao' },
  { id: 'GS010', home: 'Netherlands', away: 'Japan' },
  { id: 'GS011', home: 'Ivory Coast', away: 'Ecuador' },
  { id: 'GS012', home: 'Sweden', away: 'Tunisia' },
  { id: 'GS013', home: 'Belgium', away: 'Egypt' },
  { id: 'GS014', home: 'Spain', away: 'Cape Verde' },
  { id: 'GS015', home: 'Saudi Arabia', away: 'Uruguay' },
  { id: 'GS016', home: 'Iran', away: 'New Zealand' },
  { id: 'GS017', home: 'France', away: 'Senegal' },
  { id: 'GS018', home: 'Iraq', away: 'Norway' },
  { id: 'GS019', home: 'Argentina', away: 'Algeria' },
  { id: 'GS020', home: 'Austria', away: 'Jordan' },
  { id: 'GS021', home: 'Portugal', away: 'Congo DR' },
  { id: 'GS022', home: 'England', away: 'Croatia' },
  { id: 'GS023', home: 'Czech Republic', away: 'South Africa' },
  { id: 'GS024', home: 'Switzerland', away: 'Bosnia-Herzegovina' },
  { id: 'GS025', home: 'Canada', away: 'Qatar' },
  { id: 'GS026', home: 'Uzbekistan', away: 'Colombia' },
  { id: 'GS027', home: 'Ghana', away: 'Panama' },
  { id: 'GS028', home: 'Mexico', away: 'South Korea' },
  { id: 'GS029', home: 'Scotland', away: 'Morocco' },
  { id: 'GS030', home: 'United States', away: 'Australia' },
  { id: 'GS031', home: 'Brazil', away: 'Haiti' },
  { id: 'GS032', home: 'Turkey', away: 'Paraguay' },
  { id: 'GS033', home: 'Germany', away: 'Ivory Coast' },
  { id: 'GS034', home: 'Netherlands', away: 'Sweden' },
  { id: 'GS035', home: 'Ecuador', away: 'Curaçao' },
  { id: 'GS036', home: 'Tunisia', away: 'Japan' },
  { id: 'GS037', home: 'Belgium', away: 'Iran' },
  { id: 'GS038', home: 'Spain', away: 'Saudi Arabia' },
  { id: 'GS039', home: 'Uruguay', away: 'Cape Verde' },
  { id: 'GS040', home: 'New Zealand', away: 'Egypt' },
  { id: 'GS041', home: 'France', away: 'Iraq' },
  { id: 'GS042', home: 'Argentina', away: 'Austria' },
  { id: 'GS043', home: 'Norway', away: 'Senegal' },
  { id: 'GS044', home: 'Jordan', away: 'Algeria' },
  { id: 'GS045', home: 'Portugal', away: 'Uzbekistan' },
  { id: 'GS046', home: 'England', away: 'Ghana' },
  { id: 'GS047', home: 'Bosnia-Herzegovina', away: 'Qatar' },
  { id: 'GS048', home: 'Switzerland', away: 'Canada' },
  { id: 'GS049', home: 'Morocco', away: 'Haiti' },
  { id: 'GS050', home: 'Scotland', away: 'Brazil' },
  { id: 'GS051', home: 'Colombia', away: 'Congo DR' },
  { id: 'GS052', home: 'Panama', away: 'Croatia' },
  { id: 'GS053', home: 'Czech Republic', away: 'Mexico' },
  { id: 'GS054', home: 'South Africa', away: 'South Korea' },
  { id: 'GS055', home: 'Curaçao', away: 'Ivory Coast' },
  { id: 'GS056', home: 'Ecuador', away: 'Germany' },
  { id: 'GS057', home: 'Paraguay', away: 'Australia' },
  { id: 'GS058', home: 'Turkey', away: 'United States' },
  { id: 'GS059', home: 'Japan', away: 'Sweden' },
  { id: 'GS060', home: 'Tunisia', away: 'Netherlands' },
  { id: 'GS061', home: 'Norway', away: 'France' },
  { id: 'GS062', home: 'Senegal', away: 'Iraq' },
  { id: 'GS063', home: 'Egypt', away: 'Iran' },
  { id: 'GS064', home: 'New Zealand', away: 'Belgium' },
  { id: 'GS065', home: 'Cape Verde', away: 'Saudi Arabia' },
  { id: 'GS066', home: 'Uruguay', away: 'Spain' },
  { id: 'GS067', home: 'Croatia', away: 'Ghana' },
  { id: 'GS068', home: 'Panama', away: 'England' },
  { id: 'GS069', home: 'Algeria', away: 'Austria' },
  { id: 'GS070', home: 'Jordan', away: 'Argentina' },
  { id: 'GS071', home: 'Colombia', away: 'Portugal' },
  { id: 'GS072', home: 'Congo DR', away: 'Uzbekistan' },
];

function matchTeamName(ourName, apiName) {
  const a = ourName.toLowerCase();
  const b = apiName.toLowerCase();
  // Direct match or first word match
  return a === b || a.includes(b.split(' ')[0]) || b.includes(a.split(' ')[0]) ||
    // Handle common variations
    (a === 'united states' && b.includes('usa')) ||
    (a === 'usa' && b.includes('united states')) ||
    (a === 'ivory coast' && (b.includes('côte') || b.includes('cote'))) ||
    (a === 'congo dr' && (b.includes('congo') && b.includes('democratic'))) ||
    (a === 'south korea' && b.includes('korea'));
}

export default async function handler(req, res) {
  // Allow Vercel cron (GET) and manual admin calls (POST)
  // If CRON_SECRET is set, verify it; if not set, allow all (for Vercel hobby crons)
  const authHeader = req.headers['authorization'];
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && req.method !== 'POST') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  // Init Firebase Admin (server-side Firestore access)
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  const db = getFirestore();

  try {
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED',
      { headers: { 'X-Auth-Token': apiKey } }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: `API error: ${response.status}` });
    }

    const data = await response.json();
    let saved = 0;

    for (const match of data.matches) {
      if (match.score?.fullTime?.home === null && match.score?.fullTime?.home === undefined) continue;
      if (match.score?.fullTime?.home === null) continue;

      const fixture = FIXTURES.find(f =>
        matchTeamName(f.home, match.homeTeam.name) &&
        matchTeamName(f.away, match.awayTeam.name)
      );

      if (!fixture) continue;

      // Get first goalscorer from goals array
      let firstGoalscorer = '';
      if (match.goals?.length > 0) {
        const sorted = [...match.goals].sort((a, b) =>
          (a.minute + (a.injuryTime || 0)) - (b.minute + (b.injuryTime || 0))
        );
        if (sorted[0]?.scorer?.name) firstGoalscorer = sorted[0].scorer.name;
      }

      // Use extraTime score if available (goals in ET count), ignore penalties
      const duration = match.score.duration; // REGULAR, EXTRA_TIME, PENALTY_SHOOTOUT
      let finalHome = match.score.fullTime.home;
      let finalAway = match.score.fullTime.away;
      if ((duration === 'EXTRA_TIME' || duration === 'PENALTY_SHOOTOUT') && match.score.extraTime?.home !== null) {
        finalHome = match.score.extraTime.home;
        finalAway = match.score.extraTime.away;
      }

      await db.collection('results').doc(fixture.id).set({
        home: finalHome,
        away: finalAway,
        firstGoalscorer,
        duration: duration || 'REGULAR',
        autoFetched: true,
        fetchedAt: new Date().toISOString(),
      }, { merge: true });

      saved++;
    }

    return res.status(200).json({
      ok: true,
      saved,
      total: data.matches.length,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
