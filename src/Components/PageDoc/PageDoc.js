import React from 'react';
import { db } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

function PageDoc() {
    const [demandes, setDemandes] = React.useState([]);
    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'demandes'));
            const values = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            const accepte = values.filter(value => value.etat === 'accepte');
            const attente = values.filter(value => value.etat === 'attente');
            const refuse = values.filter(value => value.etat === 'refuse');
            console.log(accepte, attente, refuse);
            const toutesLesDemandes = [...attente, ...accepte, ...refuse];
            setDemandes(toutesLesDemandes);
            console.log(demandes);

        })();



    }, []);

    return (
        <div>
            <h1>PageDoc</h1>
            {demandes.map((demande) => (
                <div key={demande.id}>
                    <p>{demande.date}</p>
                    <p>{demande.heure}</p>
                </div>
            ))}

        </div>
    )
}

export default PageDoc