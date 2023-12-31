import { describe, expect, test } from '@jest/globals';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

describe('fetch clients', () => {
    test('Verify Client Adien LDKA', async () => {
        const clients = await getDocs(collection(db, 'clients'))
        const userExist = clients.docs.find(doc => doc.data().prenom === 'Est un Test' && doc.data().nom === 'Ceci');
        expect(userExist.id).toBeDefined();
        await deleteDoc(doc(db, "clients", userExist.id));
        const userNotExist = await getDocs(collection(db, 'clients'))
        const userNotExists = userNotExist.docs.find(doc => doc.data().prenom === 'Ceci' && doc.data().nom === 'Est un Test');
        expect(userNotExists).toBeUndefined();
    });
});