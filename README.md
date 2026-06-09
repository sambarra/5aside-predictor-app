# 5aside WC26 Predictor

World Cup 2026 prediction app for predictor.5aside.com

## Setup

### 1. Add your Firebase config

Open `src/firebase.js` and replace the placeholder values with your actual Firebase config from the Firebase console.

### 2. Deploy to Vercel

**Option A — Drag and drop (easiest):**
1. Run `npm install && npm run build` locally, or just upload the whole folder
2. Go to vercel.com → New Project → drag this folder

**Option B — Via GitHub:**
1. Push this repo to GitHub: `git init && git add . && git commit -m "init" && git remote add origin https://github.com/sambarra/5aside-predictor.git && git push -u origin main`
2. Go to vercel.com → New Project → Import from GitHub → select `5aside-predictor`
3. Vercel auto-detects Create React App — just click Deploy

### 3. Set up subdomain

In Hostinger DNS for 5aside.com:
- Type: CNAME
- Name: predictor
- Value: cname.vercel-dns.com
- TTL: 3600

Then in Vercel → your project → Settings → Domains → add `predictor.5aside.com`

### 4. Change admin PIN

In `src/pages/Admin.js`, line 8:
```js
const ADMIN_PIN = '5aside2026'; // Change this!
```

## How it works

- Users enter a name + 4-digit PIN to play (no email needed)
- Predict scorelines + first goalscorer for every group stage match
- Predictions lock at kickoff time for each match individually
- Tournament picks (winner, runner-up, 3rd, golden boot) lock before GW1

## Entering results (Admin)

1. Click "Admin" tab at bottom of app
2. Enter admin PIN
3. Select a match, enter the score and first goalscorer
4. Hit Save — leaderboard updates instantly

## Scoring
- Exact score: 5pts
- Correct result (W/D/L): 2pts  
- First goalscorer: 3pts
- Tournament winner: +20pts
- Runner-up: +15pts
- Third place: +10pts
- Golden Boot: +15pts

## Firebase collections created automatically
- `users` — player accounts
- `predictions` — one doc per player per match (id: `{userId}_{fixtureId}`)
- `results` — one doc per match (id: `{fixtureId}`)
- `tournamentPredictions` — one doc per player (id: `{userId}`)
