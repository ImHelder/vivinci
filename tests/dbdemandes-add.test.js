import { describe, expect, test } from '@jest/globals';
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

async function accessDBUsers() {
    const getDemandes = await getDocs(collection(db, 'demandes'));
    return getDemandes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}



describe('fetch clients', () => {
    
    test('Verify New Demand From Ceci Est un Test', async () => {
        const clients = await getDocs(collection(db, 'clients'))
        const userExist = clients.docs.find(doc => doc.data().prenom === 'Est un Test' && doc.data().nom === 'Ceci');
        expect(userExist.id).toBeDefined();
        await addDoc(collection(db, 'demandes'), {
            idClient: userExist.id,
            idMedecin: 'Alain Dezer',
            date: '2023-09-12',
            heure: '15H - 16H',
            specialite: 'Pédiatre',
            etat: 'attente',
            client: 'Ceci Est un Test'
        })
        const getDemandes = await accessDBUsers();
        const value = getDemandes.find(user => user.client === 'Ceci Est un Test');
        expect(value.client).toBe('Ceci Est un Test');
        expect(value.idClient).toBe(userExist.id);
        expect(value.idMedecin).toBe('Alain Dezer');
        expect(value.specialite).toBe('Pédiatre');
        expect(value.date).toBe('2023-09-12');
        expect(value.heure).toBe('15H - 16H');
        expect(value.etat).toBe('attente');
    });
});