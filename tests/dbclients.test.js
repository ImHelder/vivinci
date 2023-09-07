import { describe, expect, test } from '@jest/globals';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

async function accessDBUsers() {
    const getClients = await getDocs(collection(db, 'clients'));
    return getClients.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

describe('fetch clients', () => {
    test('Verify Client Adien LDKA', async () => {
        const getClients = await accessDBUsers();
        const value = getClients.find(user => user.id === 'DqmrVoZQZYlJkQOsTl4z');
        expect(value.nom).toBe('Adrien');
        expect(value.prenom).toBe('LDKA');
    });
});