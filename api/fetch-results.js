// build-20260609
// Vercel Serverless Function
// Fetches completed World Cup match results from football-data.org
// Called from the admin panel - API key is secure server-side only

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // FIFA World Cup 2026 competition ID on football-data.org is WC
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED',
      {
        headers: {
          'X-Auth-Token': apiKey,
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ 
        error: `football-data.org error: ${response.status}`,
        detail: errText
      });
    }

    const data = await response.json();
    
    // Transform matches into our format
    const results = data.matches.map(match => {
      // Find first goalscorer from goals array
      let firstGoalscorer = null;
      if (match.goals && match.goals.length > 0) {
        // Sort by minute to find first goal
        const sorted = [...match.goals].sort((a, b) => {
          const minA = a.minute + (a.injuryTime || 0);
          const minB = b.minute + (b.injuryTime || 0);
          return minA - minB;
        });
        const firstGoal = sorted[0];
        if (firstGoal && firstGoal.scorer) {
          firstGoalscorer = firstGoal.scorer.name;
        }
      }

      return {
        // football-data.org uses home/away team names
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        homeScore: match.score.fullTime.home,
        awayScore: match.score.fullTime.away,
        firstGoalscorer,
        matchday: match.matchday,
        utcDate: match.utcDate,
        // We'll match these to our fixture IDs by team names
        fdoId: match.id,
      };
    });

    return res.status(200).json({ results, count: results.length });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
