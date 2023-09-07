import { describe, expect, test } from '@jest/globals';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../src/firebaseConfig'

describe('fetch clients', () => {
    test('Verify Client Adien LDKA', async () => {
        const userExist = await getDocs(collection(db, 'demandes')).docs.find(doc => doc.data().client === 'Ceci Est un Test');
        expect(userExist.id).toBeDefined();
        await deleteDoc(doc(db, "clients", userExist.id));
        const userNotExist = await getDocs(collection(db, 'clients')).docs.find(doc => doc.data().client === 'Ceci Est un Test');
        expect(userNotExist).toBeUndefined();
    });
});