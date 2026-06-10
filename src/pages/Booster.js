// build-20260610
// Booster system - one per round, doubles all points for one match
// Stored in Firestore: boosters/{userId}_{stage} = { fixtureId, appliedAt, stage }

import { db } from '../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

export async function getBoosterForStage(userId, stage) {
  const snap = await getDoc(doc(db, 'boosters', `${userId}_${stage}`));
  return snap.exists() ? snap.data() : null;
}

export async function applyBooster(userId, stage, fixtureId) {
  await setDoc(doc(db, 'boosters', `${userId}_${stage}`), {
    userId, stage, fixtureId, appliedAt: new Date().toISOString(),
  });
}

export async function removeBooster(userId, stage) {
  await deleteDoc(doc(db, 'boosters', `${userId}_${stage}`));
}

// Which stage does a fixture belong to?
export function getFixtureStage(fixture) {
  return fixture.stage || 'group';
}
