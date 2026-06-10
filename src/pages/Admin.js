// build-20260609
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import {
  doc, setDoc, getDocs, collection, deleteDoc, query, where
} from 'firebase/firestore';
import { GROUP_STAGE_FIXTURES } from '../data/fixtures';
import { STAGES, R32_BRACKET, KNOCKOUT_TEMPLATE } from '../data/knockoutFixtures';

const HARDCODED_SUPER_ADMIN = 'WC2026admin';

// Tournament Result Tab - admin enters final outcomes to award bonus points
function TournamentResultTab({ db }) {
  const [form, setForm] = useState({ winner: '', runner_up: '', third: '', golden_boot: '' });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getDocs(collection(db, 'tournamentResults')).then(snap => {
      if (!snap.empty) {
        setForm(snap.docs[0].data());
        setSaved(true);
      }
    });
  }, [db]);

  async function saveTournamentResult() {
    if (!form.winner || !form.golden_boot) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'tournamentResults', 'final'), {
        ...form, updatedAt: new Date().toISOString(),
      });
      setSaved(true);
      setMsg('✓ Tournament results saved — standings will now include bonus points');
    } catch (err) {
      setMsg('❌ Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16, lineHeight: 1.6 }}>
        Enter the final tournament outcomes after the Final. This unlocks the bonus points (+30/+20/+10/+20) in the standings.
      </p>
      {msg && <div style={{ padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 8, marginBottom: 14, fontSize: 13, color: msg.startsWith('✓') ? 'var(--green)' : 'var(--red)' }}>{msg}</div>}
      <div className="card" style={{ padding: '16px' }}>
        {[
          { key: 'winner', label: '🏆 Tournament Winner', pts: '+30pts' },
          { key: 'runner_up', label: '🥈 Runner-up', pts: '+20pts' },
          { key: 'third', label: '🥉 Third Place', pts: '+10pts' },
          { key: 'golden_boot', label: '⚽ Golden Boot', pts: '+20pts' },
        ].map(({ key, label, pts }) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span>{label}</span>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>{pts}</span>
            </label>
            <input
              className="input"
              placeholder={key === 'golden_boot' ? 'e.g. Kylian Mbappe (France)' : 'e.g. France'}
              value={form[key] || ''}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
            />
          </div>
        ))}
        <button
          className={`btn btn-primary btn-full ${!form.winner || !form.golden_boot ? 'btn-ghost' : ''}`}
          onClick={saveTournamentResult}
          disabled={saving || !form.winner || !form.golden_boot}
          style={{ marginTop: 4 }}
        >
          {saving ? 'Saving...' : saved ? '✓ Update tournament results' : '🎖️ Save tournament results'}
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 12, lineHeight: 1.6 }}>
        Once saved, the standings will automatically show updated totals including tournament bonus points for all players.
      </p>
    </div>
  );
}


// Knockout fixture management component
function KnockoutTab({ knockoutFixtures, selectedStage, setSelectedStage, addingKnockout, setAddingKnockout, knockoutMsg, setKnockoutMsg, loadKnockoutFixtures, db }) {
  const [editFixture, setEditFixture] = useState(null);
  const [form, setForm] = useState({ home: '', away: '', kickoff: '' });
  const [saving, setSaving] = useState(false);

  const stageFixtures = knockoutFixtures.filter(f => f.stage === selectedStage);
  const stageInfo = STAGES[selectedStage];

  // Auto-populate R32 bracket from the pre-defined structure
  async function populateR32() {
    if (!window.confirm('Populate Round of 32 fixtures with the standard bracket structure? You can edit team names afterwards.')) return;
    setSaving(true);
    try {
      for (const fixture of R32_BRACKET) {
        await setDoc(doc(db, 'knockoutFixtures', fixture.id), {
          ...fixture,
          home: fixture.homeDesc,
          away: fixture.awayDesc,
          kickoff: '',
          active: false,
          createdAt: new Date().toISOString(),
        });
      }
      await loadKnockoutFixtures();
      setKnockoutMsg('✓ Round of 32 fixtures created. Edit team names once group stage is complete.');
    } catch (err) {
      setKnockoutMsg('❌ Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  // Auto-populate a knockout round from template
  async function populateFromTemplate(stage) {
    const template = KNOCKOUT_TEMPLATE[stage];
    if (!template) return;
    if (!window.confirm(`Populate ${STAGES[stage].label} fixtures? Edit team names after.`)) return;
    setSaving(true);
    try {
      for (const fixture of template) {
        await setDoc(doc(db, 'knockoutFixtures', fixture.id), {
          ...fixture,
          home: fixture.homeDesc,
          away: fixture.awayDesc,
          kickoff: '',
          active: false,
          createdAt: new Date().toISOString(),
        });
      }
      await loadKnockoutFixtures();
      setKnockoutMsg(`✓ ${STAGES[stage].label} fixtures created.`);
    } catch (err) {
      setKnockoutMsg('❌ Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveFixture() {
    if (!editFixture || !form.home || !form.away) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'knockoutFixtures', editFixture.id), {
        ...editFixture,
        home: form.home,
        away: form.away,
        kickoff: form.kickoff,
      }, { merge: true });
      await loadKnockoutFixtures();
      setEditFixture(null);
      setKnockoutMsg('✓ Fixture updated');
      setTimeout(() => setKnockoutMsg(''), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function activateStage(stage) {
    if (!window.confirm(`Activate ${STAGES[stage].label} for predictions? Players will immediately see these fixtures.`)) return;
    const stageFixtures = knockoutFixtures.filter(f => f.stage === stage);
    for (const f of stageFixtures) {
      await setDoc(doc(db, 'knockoutFixtures', f.id), { active: true }, { merge: true });
    }
    await loadKnockoutFixtures();
    setKnockoutMsg(`✓ ${STAGES[stage].label} is now live for predictions`);
  }

  return (
    <div>
      <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 14, lineHeight: 1.5 }}>
        Manage knockout round fixtures. Populate each round once team names are known, edit kickoff times, then activate to open predictions.
      </p>

      {knockoutMsg && (
        <div style={{ padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 8, marginBottom: 14, fontSize: 13, color: knockoutMsg.startsWith('✓') ? 'var(--green)' : 'var(--red)' }}>
          {knockoutMsg}
        </div>
      )}

      {/* Stage selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {Object.entries(STAGES).map(([key, s]) => {
          const count = knockoutFixtures.filter(f => f.stage === key).length;
          const active = knockoutFixtures.filter(f => f.stage === key && f.active).length > 0;
          return (
            <button
              key={key}
              className={`btn btn-sm ${selectedStage === key ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setSelectedStage(key)}
              style={{ flexShrink: 0 }}
            >
              {s.shortLabel}
              {count > 0 && <span style={{ marginLeft: 4, fontSize: 10, color: active ? 'var(--green)' : 'var(--text-3)' }}>
                {active ? '●' : '○'}
              </span>}
            </button>
          );
        })}
      </div>

      {/* Current stage info */}
      <div className="card" style={{ marginBottom: 14, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14 }}>{stageInfo.label}</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
              +{stageInfo.pointsExact}pts correct score · +{stageInfo.pointsResult}pts correct result · +{stageInfo.pointsScorer}pts scorer
            </p>
          </div>
          {stageFixtures.length > 0 && stageFixtures.some(f => !f.active) && (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => activateStage(selectedStage)}
            >
              🟢 Activate
            </button>
          )}
          {stageFixtures.length > 0 && stageFixtures.every(f => f.active) && (
            <span className="badge badge-green">Live ●</span>
          )}
        </div>

        {/* Populate buttons */}
        {stageFixtures.length === 0 && (
          <button
            className="btn btn-outline btn-full"
            onClick={() => selectedStage === 'r32' ? populateR32() : populateFromTemplate(selectedStage)}
            disabled={saving}
            style={{ marginTop: 4 }}
          >
            {saving ? '⏳ Creating...' : `⚡ Auto-populate ${stageInfo.label} fixtures`}
          </button>
        )}
      </div>

      {/* Fixture list */}
      {stageFixtures.length > 0 && (
        <div className="card" style={{ padding: 0, marginBottom: 14 }}>
          {stageFixtures.map((f, idx) => (
            <div key={f.id} style={{
              padding: '10px 14px', borderBottom: idx < stageFixtures.length - 1 ? '1px solid var(--border)' : undefined,
              background: editFixture?.id === f.id ? 'rgba(0,255,106,0.04)' : undefined,
            }}>
              {editFixture?.id === f.id ? (
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input className="input" placeholder="Home team" value={form.home} onChange={e => setForm(p => ({ ...p, home: e.target.value }))} style={{ flex: 1 }} />
                    <input className="input" placeholder="Away team" value={form.away} onChange={e => setForm(p => ({ ...p, away: e.target.value }))} style={{ flex: 1 }} />
                  </div>
                  <input
                    className="input"
                    type="datetime-local"
                    value={form.kickoff}
                    onChange={e => setForm(p => ({ ...p, kickoff: e.target.value }))}
                    style={{ marginBottom: 8, width: '100%' }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditFixture(null)}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={saveFixture} disabled={saving}>
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {f.home} <span style={{ color: 'var(--text-3)' }}>vs</span> {f.away}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                      {f.kickoff ? new Date(f.kickoff).toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Kickoff TBC'}
                      {f.active && <span style={{ color: 'var(--green)', marginLeft: 8 }}>● Live</span>}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: 11 }}
                    onClick={() => { setEditFixture(f); setForm({ home: f.home, away: f.away, kickoff: f.kickoff || '' }); }}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default function Admin({ onBack }) {
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('results');
  const [results, setResults] = useState({});
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ home: '', away: '', firstGoalscorer: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState('');
  const [players, setPlayers] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [showPins, setShowPins] = useState(false);
  const [newAdminName, setNewAdminName] = useState('');
  const [adminMsg, setAdminMsg] = useState('');
  const [viewingMatch, setViewingMatch] = useState(null);
  const [knockoutFixtures, setKnockoutFixtures] = useState([]);
  const [addingKnockout, setAddingKnockout] = useState(false);
  const [knockoutMsg, setKnockoutMsg] = useState('');
  const [selectedStage, setSelectedStage] = useState('r32');
  const [matchPredictions, setMatchPredictions] = useState([]);

  const loadResults = useCallback(async () => {
    const snap = await getDocs(collection(db, 'results'));
    const map = {};
    snap.forEach(d => { map[d.id] = d.data(); });
    setResults(map);
  }, []);

  const loadPlayers = useCallback(async () => {
    setLoadingPlayers(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => a.name.localeCompare(b.name));
      setPlayers(list);
    } finally {
      setLoadingPlayers(false);
    }
  }, []);

  const loadAdmins = useCallback(async () => {
    const snap = await getDocs(collection(db, 'admins'));
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    setAdmins(list);
  }, []);

  useEffect(() => {
    if (authed) { loadResults(); loadPlayers(); loadAdmins(); loadKnockoutFixtures(); }
  }, [authed, loadResults, loadPlayers, loadAdmins]);

  const loadKnockoutFixtures = useCallback(async () => {
    const snap = await getDocs(collection(db, 'knockoutFixtures'));
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    setKnockoutFixtures(list);
  }, []);

  async function handleLogin() {
    setPinError('');
    // Super admin master PIN
    if (pinInput === HARDCODED_SUPER_ADMIN) { setAuthed(true); return; }
    // Check admins collection (PIN stored there)
    const adminsSnap = await getDocs(collection(db, 'admins'));
    for (const d of adminsSnap.docs) {
      if (d.data().pin === pinInput) { setAuthed(true); return; }
    }
    // Fallback: check if this person is in users collection and is an admin by name
    const usersSnap = await getDocs(collection(db, 'users'));
    for (const d of usersSnap.docs) {
      const userData = d.data();
      if (userData.pin === pinInput) {
        // Check if this user is listed in admins collection
        const adminCheck = await getDocs(query(collection(db, 'admins'), where('pin', '==', pinInput)));
        if (!adminCheck.empty) { setAuthed(true); return; }
      }
    }
    setPinError("Wrong PIN. Use your player PIN (if added as admin) or the master PIN.");
  }

  async function saveResult() {
    if (!selected || form.home === '' || form.away === '') return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'results', selected), {
        home: parseInt(form.home), away: parseInt(form.away),
        firstGoalscorer: form.firstGoalscorer, enteredAt: new Date().toISOString(),
      });
      setResults(prev => ({ ...prev, [selected]: { home: parseInt(form.home), away: parseInt(form.away), firstGoalscorer: form.firstGoalscorer } }));
      setMsg('✓ Result saved'); setTimeout(() => setMsg(''), 3000);
    } finally { setSaving(false); }
  }

  async function autoFetchResults() {
    setFetching(true); setFetchMsg('Fetching from football-data.org...');
    try {
      const resp = await fetch('/api/fetch-results', { method: 'POST' });
      const data = await resp.json();
      if (!resp.ok) { setFetchMsg(`❌ Error: ${data.error}`); return; }
      if (data.count === 0) { setFetchMsg('No completed matches found yet.'); return; }
      let saved = 0;
      for (const apiResult of data.results) {
        const fixture = GROUP_STAGE_FIXTURES.find(f => {
          const h1 = f.home.toLowerCase(); const h2 = apiResult.homeTeam.toLowerCase();
          const a1 = f.away.toLowerCase(); const a2 = apiResult.awayTeam.toLowerCase();
          return (h1.includes(h2.split(' ')[0]) || h2.includes(h1.split(' ')[0])) &&
                 (a1.includes(a2.split(' ')[0]) || a2.includes(a1.split(' ')[0]));
        });
        if (fixture && apiResult.homeScore !== null && apiResult.awayScore !== null) {
          await setDoc(doc(db, 'results', fixture.id), {
            home: apiResult.homeScore, away: apiResult.awayScore,
            firstGoalscorer: apiResult.firstGoalscorer || '',
            autoFetched: true, fetchedAt: new Date().toISOString(),
          });
          saved++;
        }
      }
      await loadResults();
      setFetchMsg(`✓ Synced ${saved} result${saved !== 1 ? 's' : ''} from ${data.count} completed matches`);
    } catch (err) {
      setFetchMsg(`❌ Network error: ${err.message}`);
    } finally { setFetching(false); }
  }

  async function deletePlayer(playerId, playerName) {
    if (!window.confirm(`Remove ${playerName}? This deletes their account and all predictions.`)) return;
    await deleteDoc(doc(db, 'users', playerId));
    const predsSnap = await getDocs(query(collection(db, 'predictions'), where('userId', '==', playerId)));
    for (const d of predsSnap.docs) await deleteDoc(d.ref);
    await deleteDoc(doc(db, 'tournamentPredictions', playerId));
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    setMsg(`✓ ${playerName} removed`); setTimeout(() => setMsg(''), 3000);
  }

  async function addAdmin(name) {
    if (!name.trim()) return;
    const q = query(collection(db, 'users'), where('nameLower', '==', name.trim().toLowerCase()));
    const snap = await getDocs(q);
    if (snap.empty) { setAdminMsg(`❌ No player named "${name}" found. They must log in first.`); return; }
    const userData = snap.docs[0].data();
    await setDoc(doc(db, 'admins', name.trim().toLowerCase()), {
      name: name.trim(), pin: userData.pin, addedAt: new Date().toISOString(),
    });
    setAdminMsg(`✓ ${name} is now an admin. They use their player PIN.`);
    setNewAdminName(''); loadAdmins();
  }

  async function removeAdmin(adminId, adminName) {
    if (!window.confirm(`Remove ${adminName} as admin?`)) return;
    await deleteDoc(doc(db, 'admins', adminId)); loadAdmins();
  }

  async function viewPredictions(fixtureId) {
    setViewingMatch(fixtureId);
    const snap = await getDocs(query(collection(db, 'predictions'), where('fixtureId', '==', fixtureId)));
    const preds = [];
    snap.forEach(d => preds.push(d.data()));
    preds.sort((a, b) => a.userName.localeCompare(b.userName));
    setMatchPredictions(preds);
  }

  function selectFixture(id) {
    setSelected(id); setViewingMatch(null); setMatchPredictions([]);
    const e = results[id];
    setForm(e ? { home: e.home, away: e.away, firstGoalscorer: e.firstGoalscorer || '' } : { home: '', away: '', firstGoalscorer: '' });
    setMsg('');
  }

  if (!authed) {
    return (
      <div className="page" style={{ maxWidth: 400 }}>
        <h1 className="page-title">⚙️ Admin</h1>
        <p className="page-sub">Enter your PIN to continue</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input className="input" type="password" placeholder="Enter PIN"
            value={pinInput} onChange={e => setPinInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ fontSize: 16, letterSpacing: '0.2em' }} />
          <button className="btn btn-primary" onClick={handleLogin}>Enter</button>
        </div>
        {pinError && <p style={{ color: 'var(--red)', fontSize: 13, marginBottom: 8 }}>{pinError}</p>}
        <div className="card" style={{ padding: '12px 14px' }}>
          <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 0 }}>
            <strong style={{ color: 'var(--text)' }}>League admins</strong> — use your player PIN (after being added in Admin → Admins)<br/>
            <strong style={{ color: 'var(--text)' }}>Super admin</strong> — use the master PIN for full access
          </p>
        </div>
      </div>
    );
  }

  const now = new Date();
  const completedFixtures = GROUP_STAGE_FIXTURES.filter(f => new Date(f.kickoff) < now);

  return (
    <div className="page">
      <h1 className="page-title">⚙️ Admin</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Results in', value: Object.keys(results).length, color: 'var(--green)' },
          { label: 'Pending', value: completedFixtures.length - Object.keys(results).length, color: 'var(--amber)' },
          { label: 'Players', value: players.length, color: 'var(--green)' },
          { label: 'Admins', value: admins.length + 1, color: 'var(--text-2)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ flex: 1, minWidth: 70, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 24, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-2)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[['results', '⚽ Results'], ['players', '👥 Players'], ['admins', '🔑 Admins'], ['knockout', '🏆 Knockout'], ['tournament_result', '🎖️ Final']].map(([t, label]) => (
          <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab(t)} style={{ flexShrink: 0 }}>{label}</button>
        ))}
      </div>

      {msg && <div style={{ padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 8, marginBottom: 14, fontSize: 13, color: msg.startsWith('✓') ? 'var(--green)' : 'var(--red)' }}>{msg}</div>}

      {activeTab === 'results' && (
        <div>
          <div className="card" style={{ marginBottom: 14, padding: '14px 16px' }}>
            <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>🤖 Auto-fetch results</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10 }}>Pulls scores + first goalscorer from football-data.org</p>
            <button className={`btn btn-full ${fetching ? 'btn-ghost' : 'btn-outline'}`} onClick={autoFetchResults} disabled={fetching}>
              {fetching ? '⏳ Fetching...' : '⚡ Fetch Latest Results'}
            </button>
            {fetchMsg && <p style={{ fontSize: 12, marginTop: 8, color: fetchMsg.startsWith('✓') ? 'var(--green)' : fetchMsg.startsWith('❌') ? 'var(--red)' : 'var(--text-2)' }}>{fetchMsg}</p>}
          </div>

          <div style={{ display: 'flex', gap: 14, flexDirection: 'column' }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Manual override</p>
              <div className="card" style={{ padding: 0, maxHeight: 320, overflowY: 'auto' }}>
                {completedFixtures.length === 0 && <p style={{ padding: 14, color: 'var(--text-2)', fontSize: 13 }}>No matches kicked off yet</p>}
                {completedFixtures.map(f => {
                  const r = results[f.id];
                  return (
                    <div key={f.id} onClick={() => selectFixture(f.id)} style={{
                      padding: '9px 14px', borderBottom: '1px solid var(--border)', cursor: 'pointer',
                      background: selected === f.id ? 'rgba(0,255,106,0.06)' : undefined,
                      borderLeft: selected === f.id ? '2px solid var(--green)' : '2px solid transparent',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{f.home} vs {f.away}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <span>Gr {f.group}</span>
                        {r ? <span style={{ color: r.autoFetched ? 'var(--amber)' : 'var(--green)' }}>{r.home}–{r.away} {r.autoFetched ? '🤖' : '✓'}</span>
                           : <span style={{ color: 'var(--red)' }}>No result</span>}
                      </div>
                      {r?.firstGoalscorer && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>⚽ {r.firstGoalscorer}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {selected && (() => {
              const f = GROUP_STAGE_FIXTURES.find(x => x.id === selected);
              return (
                <div className="card">
                  <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>{f.home} vs {f.away}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>{f.home}</label>
                      <input className="input" type="number" min="0" max="20" value={form.home} onChange={e => setForm(p => ({ ...p, home: e.target.value }))} placeholder="0" />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-3)', paddingTop: 18 }}>–</span>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>{f.away}</label>
                      <input className="input" type="number" min="0" max="20" value={form.away} onChange={e => setForm(p => ({ ...p, away: e.target.value }))} placeholder="0" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontSize: 11, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>First goalscorer</label>
                    <input className="input" type="text" value={form.firstGoalscorer} onChange={e => setForm(p => ({ ...p, firstGoalscorer: e.target.value }))} placeholder="e.g. Kylian Mbappé" />
                  </div>
                  <button className="btn btn-primary btn-full" onClick={saveResult} disabled={saving || form.home === '' || form.away === ''}>
                    {saving ? 'Saving...' : 'Save Result'}
                  </button>
                  <button className="btn btn-ghost btn-full" onClick={() => viewPredictions(selected)} style={{ marginTop: 8 }}>
                    👁 View all predictions
                  </button>
                  {viewingMatch === selected && matchPredictions.length > 0 && (
                    <div style={{ marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                      <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600 }}>All predictions</p>
                      {matchPredictions.map(p => (
                        <div key={p.userId} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                          <span style={{ fontWeight: 600 }}>{p.userName}</span>
                          <span style={{ color: 'var(--green)' }}>{p.homeScore}–{p.awayScore}</span>
                          <span style={{ color: 'var(--text-3)' }}>{p.firstGoalscorer || '—'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {activeTab === 'players' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{players.length} registered players</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowPins(p => !p)}>{showPins ? '🔒 Hide PINs' : '🔑 Show PINs'}</button>
              <button className="btn btn-ghost btn-sm" onClick={loadPlayers}>↺ Refresh</button>
            </div>
          </div>
          {loadingPlayers ? <p style={{ color: 'var(--text-2)', fontSize: 13 }}>Loading...</p> : (
            <div className="card" style={{ padding: 0 }}>
              {players.map((player, idx) => (
                <div key={player.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: idx < players.length - 1 ? '1px solid var(--border)' : undefined }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{player.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
                      <span>{player.createdAt ? new Date(player.createdAt.seconds * 1000).toLocaleDateString('en-GB') : 'unknown'}</span>
                      {showPins && <span style={{ color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.1em', background: 'rgba(255,168,0,0.1)', padding: '1px 6px', borderRadius: 4 }}>PIN: {player.pin}</span>}
                    </div>
                  </div>
                  <button className="btn btn-sm" style={{ background: 'rgba(255,68,68,0.1)', color: 'var(--red)', border: '1px solid rgba(255,68,68,0.2)', fontSize: 11 }}
                    onClick={() => deletePlayer(player.id, player.name)}>Remove</button>
                </div>
              ))}
              {players.length === 0 && <p style={{ padding: 14, fontSize: 12, color: 'var(--text-2)' }}>No players yet</p>}
            </div>
          )}
        </div>
      )}

      {activeTab === 'knockout' && (
        <KnockoutTab
          knockoutFixtures={knockoutFixtures}
          selectedStage={selectedStage}
          setSelectedStage={setSelectedStage}
          addingKnockout={addingKnockout}
          setAddingKnockout={setAddingKnockout}
          knockoutMsg={knockoutMsg}
          setKnockoutMsg={setKnockoutMsg}
          loadKnockoutFixtures={loadKnockoutFixtures}
          db={db}
        />
      )}

      {activeTab === 'tournament_result' && (
        <TournamentResultTab db={db} />
      )}

      {activeTab === 'admins' && (
        <div>
          <div className="card" style={{ marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Add admin</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 10 }}>Person must have already logged in as a player. They use their player PIN for admin access.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="input" placeholder="Player name (e.g. Jack)" value={newAdminName}
                onChange={e => setNewAdminName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAdmin(newAdminName)} />
              <button className="btn btn-primary" onClick={() => addAdmin(newAdminName)}>Add</button>
            </div>
            {adminMsg && <p style={{ fontSize: 12, marginTop: 8, color: adminMsg.startsWith('✓') ? 'var(--green)' : 'var(--red)' }}>{adminMsg}</p>}
          </div>
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Super Admin</span>
                <span className="badge badge-green">Master PIN</span>
              </div>
            </div>
            {admins.map(admin => (
              <div key={admin.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{admin.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Uses player PIN</div>
                </div>
                <button className="btn btn-sm" style={{ background: 'rgba(255,68,68,0.1)', color: 'var(--red)', border: '1px solid rgba(255,68,68,0.2)', fontSize: 11 }}
                  onClick={() => removeAdmin(admin.id, admin.name)}>Remove</button>
              </div>
            ))}
            {admins.length === 0 && <p style={{ padding: 14, fontSize: 12, color: 'var(--text-2)' }}>No additional admins yet</p>}
          </div>
        </div>
      )}
    </div>
  );
}
