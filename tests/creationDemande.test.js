import { describe, expect, test } from '@jest/globals';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'



describe('fetch medecin', () => {
  test('fetch all medecin', async () => {
    const getMedecin = await getDocs(collection(db, 'users'));
    expect(getMedecin.docs).toHaveLength(9);
  });

  test('fetch medecin by speciality Généraliste', async () => {
    const getMedecin = await getDocs(collection(db, 'users'));
    const values = getMedecin.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    const newAvailable = values.filter(user => user.spécialité.includes('Généraliste'));
    expect(newAvailable).toHaveLength(2);
  });

  test('medecin should have fields', async () => {
    const getMedecin = await getDocs(collection(db, 'users'));
    const values = getMedecin.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return values.forEach(user => {
      expect(typeof user.nom).toBe('string');
      expect(Array.isArray(user.spécialité)).toBe(true);
      user.spécialité.forEach(speciality => {expect(typeof speciality).toBe('string');});
      expect(typeof user.dates).toBe('object');
    });
  });

  test('demande should have fields', async () => {
    const getDemandes = await getDocs(collection(db, 'demandes'));
    const demandes = getDemandes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return demandes.forEach(demande => {
      expect(typeof demande.etat).toBe('string');
      expect(typeof demande.heure).toBe('string');
      expect(typeof demande.idClient).toBe('string');
      expect(typeof demande.idMedecin).toBe('string');
      expect(demande.specialite).toBe("string");
      expect(typeof demande.dates).toBe('string');
    });
  });
});