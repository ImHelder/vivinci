import { describe, expect, test } from '@jest/globals';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

async function accessDBUsers() {
    const getDemandes = await getDocs(collection(db, 'demandes'));
    return getDemandes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

describe('fetch clients', () => {
    test('Verify Client Adien LDKA', async () => {
        const getDemandes = await accessDBUsers();
        const value = getDemandes.find(user => user.id === 'QfMMLgBccBasTadeKLfU');
        expect(value.client).toBe('Adrien LDKA');
        expect(value.idClient).toBe('DqmrVoZQZYlJkQOsTl4z');
        expect(value.idMedecin).toBe('Clara Soiy');
        expect(value.specialite).toBe('Chirurgien');
        expect(value.date).toBe('2023-09-12');
        expect(value.heure).toBe('11H - 12H');
        expect(value.etat).toBe('accepte');
    });
});