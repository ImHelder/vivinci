import { describe, expect, test } from '@jest/globals';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/firebaseConfig';

describe('fetch clients', () => {
    test('Delete all matching clients', async () => {
        // Continuer à chercher et supprimer des documents jusqu'à ce qu'il n'y en ait plus
        let shouldContinue = true;
        
        while (shouldContinue) {
            const clients = await getDocs(collection(db, 'demandes'));
            const usersToDelete = clients.docs.filter(doc => doc.data().client === 'Ceci Est un Test');
            
            if (usersToDelete.length === 0) {
                shouldContinue = false; // Arrêter la boucle s'il n'y a plus de documents à supprimer
            } else {
                for (const user of usersToDelete) {
                    await deleteDoc(doc(db, "demandes", user.id));
                }
            }
        }

        // Vérifier que tous les documents correspondants ont été supprimés
        const clientsAfter = await getDocs(collection(db, 'demandes'));
        const userStillExists = clientsAfter.docs.find(doc => doc.data().client === 'Ceci Est un Test');
        
        expect(userStillExists).toBeUndefined();
    });
});
