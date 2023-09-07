import { describe, expect, test } from '@jest/globals';
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

async function accessDBUsers() {
    const getClients = await getDocs(collection(db, 'clients'));
    return getClients.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

describe('fetch clients', () => {
    test('Verify New Client Ceci Est un Test', async () => {
        const document = await addDoc(collection(db, 'clients'), {
            nom: 'Ceci',
            prenom: 'Est un Test',
        })
        const userId = document.id;
        const getClients = await accessDBUsers();
        const value = getClients.find(user => user.id === userId);
        expect(value.nom).toBe('Ceci');
        expect(value.prenom).toBe('Est un Test');
    });
});