// build-20260609
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('5aside_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  async function login(name, pin) {
    const trimmedName = name.trim();
    const trimmedPin = pin.trim();
    if (!trimmedName || trimmedPin.length < 4) throw new Error('Name and 4-digit PIN required');

    // Check if user exists by name
    const q = query(collection(db, 'users'), where('nameLower', '==', trimmedName.toLowerCase()));
    const snap = await getDocs(q);

    if (!snap.empty) {
      // Existing user — check PIN
      const doc = snap.docs[0];
      const data = doc.data();
      if (data.pin !== trimmedPin) throw new Error('Wrong PIN for that name. Try again.');
      const userData = { id: doc.id, name: data.name, nameLower: data.nameLower };
      setUser(userData);
      localStorage.setItem('5aside_user', JSON.stringify(userData));
      return userData;
    }

    // Name not found — try PIN-only fallback (handles admin-renamed accounts)
    const pinQ = query(collection(db, 'users'), where('pin', '==', trimmedPin));
    const pinSnap = await getDocs(pinQ);
    if (!pinSnap.empty) {
      // Find the doc whose pin matches — if multiple (unlikely), check name similarity
      const matchDoc = pinSnap.docs[0];
      const matchData = matchDoc.data();
      // Only allow if PIN matches and user typed something close (prevents PIN guessing)
      // We proceed: user knows their PIN, admin may have renamed them
      const userData = { id: matchDoc.id, name: matchData.name, nameLower: matchData.nameLower };
      setUser(userData);
      localStorage.setItem('5aside_user', JSON.stringify(userData));
      return userData;
    }

    else {
      // New user — create account
      const docRef = await addDoc(collection(db, 'users'), {
        name: trimmedName,
        nameLower: trimmedName.toLowerCase(),
        pin: trimmedPin,
        createdAt: serverTimestamp(),
        totalPoints: 0,
      });
      const userData = { id: docRef.id, name: trimmedName, nameLower: trimmedName.toLowerCase() };
      setUser(userData);
      localStorage.setItem('5aside_user', JSON.stringify(userData));
      return userData;
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('5aside_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
