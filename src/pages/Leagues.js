// build-20260610
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase';
import {
  collection, doc, setDoc, getDoc, getDocs, query,
  where, serverTimestamp, updateDoc, arrayUnion
} from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function Leagues() {
  const { user } = useAuth();
  const [myLeagues, setMyLeagues] = useState([]);
  const [view, setView] = useState('list'); // list | create | join
  const [leagueName, setLeagueName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const loadMyLeagues = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'leagues'), where('memberIds', 'array-contains', user.id));
      const snap = await getDocs(q);
      const leagues = [];
      snap.forEach(d => leagues.push({ id: d.id, ...d.data() }));
      setMyLeagues(leagues);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => { loadMyLeagues(); }, [loadMyLeagues]);

  async function createLeague() {
    if (!leagueName.trim()) return;
    setCreating(true);
    try {
      const code = generateCode();
      const leagueId = `league_${code}`;
      await setDoc(doc(db, 'leagues', leagueId), {
        name: leagueName.trim(),
        code,
        adminId: user.id,
        adminName: user.name,
        memberIds: [user.id],
        members: [{ id: user.id, name: user.name }],
        createdAt: serverTimestamp(),
      });
      setMsg(`✓ League "${leagueName.trim()}" created! Share this code with your mates:`);
      setLeagueName('');
      setView('created');
      await loadMyLeagues();
      window._newLeagueCode = code;
    } catch (err) {
      setMsg(`❌ Error: ${err.message}`);
    } finally {
      setCreating(false);
    }
  }

  async function joinLeague() {
    const code = joinCode.trim().toUpperCase();
    if (code.length < 4) return;
    setJoining(true);
    setMsg('');
    try {
      const q = query(collection(db, 'leagues'), where('code', '==', code));
      const snap = await getDocs(q);
      if (snap.empty) {
        setMsg('❌ No league found with that code. Check and try again.');
        return;
      }
      const leagueDoc = snap.docs[0];
      const leagueData = leagueDoc.data();
      if (leagueData.memberIds?.includes(user.id)) {
        setMsg('You\'re already in this league!');
        return;
      }
      await updateDoc(doc(db, 'leagues', leagueDoc.id), {
        memberIds: arrayUnion(user.id),
        members: arrayUnion({ id: user.id, name: user.name }),
      });
      setMsg(`✓ Joined "${leagueData.name}"!`);
      setJoinCode('');
      setView('list');
      await loadMyLeagues();
    } catch (err) {
      setMsg(`❌ Error: ${err.message}`);
    } finally {
      setJoining(false);
    }
  }

  async function leaveLeague(leagueId, leagueName) {
    if (!window.confirm(`Leave "${leagueName}"?`)) return;
    try {
      const leagueRef = doc(db, 'leagues', leagueId);
      const leagueSnap = await getDoc(leagueRef);
      const data = leagueSnap.data();
      await updateDoc(leagueRef, {
        memberIds: data.memberIds.filter(id => id !== user.id),
        members: data.members.filter(m => m.id !== user.id),
      });
      setMyLeagues(prev => prev.filter(l => l.id !== leagueId));
    } catch (err) {
      setMsg(`❌ Error: ${err.message}`);
    }
  }

  if (view === 'created') {
    const code = window._newLeagueCode;
    return (
      <div className="page">
        <h1 className="page-title">🎉 League Created!</h1>
        <div className="card card-green-border" style={{ textAlign: 'center', padding: '28px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12 }}>Share this code with your mates</p>
          <div style={{
            fontSize: 42, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.15em',
            color: 'var(--green)', background: 'var(--surface-2)', borderRadius: 12,
            padding: '16px 24px', margin: '0 auto 16px', display: 'inline-block',
          }}>
            {code}
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>
            Anyone can join at predictor.5aside.com with this code
          </p>
          <button className="btn btn-primary btn-full" onClick={() => {
            navigator.clipboard?.writeText(code);
            setMsg('✓ Code copied!');
          }}>
            Copy Code
          </button>
          {msg && <p style={{ color: 'var(--green)', fontSize: 13, marginTop: 10 }}>{msg}</p>}
        </div>
        <button className="btn btn-ghost btn-full" style={{ marginTop: 12 }} onClick={() => { setView('list'); setMsg(''); }}>
          Back to My Leagues
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">🏆 Leagues</h1>
      <p className="page-sub">Compete with your mates in a private league</p>

      {/* Action buttons */}
      {view === 'list' && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setView('create'); setMsg(''); }}>
            + Create League
          </button>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setView('join'); setMsg(''); }}>
            Join League
          </button>
        </div>
      )}

      {/* Create form */}
      {view === 'create' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Create a league</p>
          <input
            className="input"
            placeholder="League name (e.g. The Lads)"
            value={leagueName}
            onChange={e => setLeagueName(e.target.value)}
            maxLength={40}
            style={{ marginBottom: 10 }}
            onKeyDown={e => e.key === 'Enter' && createLeague()}
          />
          {msg && <p style={{ color: msg.startsWith('✓') ? 'var(--green)' : 'var(--red)', fontSize: 13, marginBottom: 10 }}>{msg}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => { setView('list'); setMsg(''); }} style={{ flex: 1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={createLeague} disabled={!leagueName.trim() || creating} style={{ flex: 1 }}>
              {creating ? 'Creating...' : 'Create →'}
            </button>
          </div>
        </div>
      )}

      {/* Join form */}
      {view === 'join' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Join a league</p>
          <input
            className="input"
            placeholder="Enter 5-character code"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase().slice(0, 5))}
            maxLength={5}
            style={{ marginBottom: 10, letterSpacing: '0.15em', fontWeight: 700, fontSize: 18, textAlign: 'center' }}
            onKeyDown={e => e.key === 'Enter' && joinLeague()}
          />
          {msg && <p style={{ color: msg.startsWith('✓') ? 'var(--green)' : 'var(--red)', fontSize: 13, marginBottom: 10 }}>{msg}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => { setView('list'); setMsg(''); }} style={{ flex: 1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={joinLeague} disabled={joinCode.length < 4 || joining} style={{ flex: 1 }}>
              {joining ? 'Joining...' : 'Join →'}
            </button>
          </div>
        </div>
      )}

      {/* My leagues */}
      {view === 'list' && (
        <>
          {loading ? (
            <p style={{ color: 'var(--text-2)', fontSize: 13 }}>Loading...</p>
          ) : myLeagues.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏆</div>
              <h3>No leagues yet</h3>
              <p>Create one and share the code with your mates</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {myLeagues.map(league => (
                <div key={league.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: 16 }}>{league.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
                        {league.memberIds?.length || 1} member{(league.memberIds?.length || 1) !== 1 ? 's' : ''} · Code: <strong style={{ color: 'var(--green)', letterSpacing: '0.1em' }}>{league.code}</strong>
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {league.adminId === user.id && <span className="badge badge-green">Admin</span>}
                      <button
                        className="btn btn-sm"
                        style={{ background: 'rgba(255,68,68,0.1)', color: 'var(--red)', border: '1px solid rgba(255,68,68,0.2)', fontSize: 11 }}
                        onClick={() => leaveLeague(league.id, league.name)}
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Members</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {(league.members || []).map(m => (
                        <span key={m.id} className="badge badge-gray">{m.name}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost btn-full btn-sm"
                    style={{ marginTop: 12, fontSize: 12 }}
                    onClick={() => { navigator.clipboard?.writeText(league.code); }}
                  >
                    📋 Copy invite code: {league.code}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
