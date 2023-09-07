import React from 'react';
import { db } from '../../firebaseConfig'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Block, CheckCircleOutline, Close, Done } from '@mui/icons-material';

function PageDoc() {
    const [demandes, setDemandes] = React.useState([]);
    const [reload, setReload] = React.useState(0);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

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



    }, [reload]);

    const accepterDemande = async (demandeId, etat) => {
        const demandeRef = doc(db, 'demandes', demandeId.id);
        await updateDoc(demandeRef, { etat: etat });
        setDemandes(demandes.map(demande => demande.id === demandeId ? { ...demande, etat: 'accepte' } : demande));
        setReload(reload + 1);
    };

    return (
        <div>
            <h1>PageDoc</h1>
            {demandes.map(demande => (
                <div className='oneDemande'>
                    <div className='oneDemandeInfos'>
                        <p className='dateInfos'>{new Date(demande.date).toLocaleString("fr-FR", options)} / {demande.heure} </p>
                        <p className='medecinInfos'>{demande.idMedecin} - {demande.specialite}</p>
                        <p className='clientInfos'>{demande.client}</p>
                        <div className="status">
                            {
                                demande.etat === "attente" ? (
                                    <div className="acctptation">
                                    <button className='btn' onClick={() => accepterDemande(demande, 'accepte')}><Done /></button>
                                    <button className='btn' onClick={() => accepterDemande(demande, 'refuse')}><Close /></button>
                                    </div>
                                ) : demande.etat === "refuse" ? (
                                    <Block />
                                ) : demande.etat === "accepte" ? (
                                    <CheckCircleOutline />
                                ) : (
                                    <p>Pas de statut</p>
                                )
                            }
                        </div>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default PageDoc