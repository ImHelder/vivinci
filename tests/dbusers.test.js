import { describe, expect, test } from '@jest/globals';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

async function accessDBUsers() {
    const getMedecin = await getDocs(collection(db, 'users'));
    return getMedecin.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

describe('fetch medecin', () => {
    test('fetch all medecin', async () => {
        const getMedecin = await accessDBUsers();
        expect(getMedecin).toHaveLength(9);
    });

    test('fetch medecin by speciality Généraliste', async () => {
        const getMedecin = await accessDBUsers();
        const newAvailable = getMedecin.filter(user => user.spécialité.includes('Généraliste'));
        expect(newAvailable).toHaveLength(2);
    });

    test('Verify Doc David Sarah', async () => {
        const getMedecin = await accessDBUsers();
        const value = getMedecin.find(user => user.id === '32dovk1ffJ2YrSnKEt6Q');
        expect(value.nom).toBe('David Sarah');
        expect(value.spécialité[0]).toBe('Urologue');
        expect(value.dates).toHaveProperty('2023-09-05');
    });
});