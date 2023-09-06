import React from 'react';
import { db } from '../../firebaseConfig'
import './SuiviRDV.css'
import { collection, getDocs } from 'firebase/firestore'
import { useLocation } from 'react-router-dom';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function SuiviRDV() {

    const [demandes, setDemandes] = React.useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const location = useLocation();
    console.log("location", location);

    React.useEffect(() => {
        (async () => {
            const medecinSnapshot = await getDocs(collection(db, 'users'));
            const _medecins = medecinSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const demandeSnapshot = await getDocs(collection(db, 'demandes'));
            // const _demandes = demandeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            const _demandes = demandeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, medecin: _medecins.find(medecin => medecin.id === doc.data().idMedecin), startHour: doc.data().heure.split("-")[0].split("h")[0], endHour: doc.data().heure.split("-")[1].split("h")[0] }));

            const userDemandes = _demandes.filter(demande => demande.idClient === location.state.clientId);
            // const sortedDemandsByDate = userDemandes.sort((a, b) => new Date(b.date) - new Date(a.date));
            setDemandes(userDemandes);
        })();
    }, []);

    // const deleteDemande = async (demandeId) => {
    //     await db.collection('demandes').doc(demandeId).delete();
    //     setDemandes(demandes.filter(demande => demande.id !== demandeId));
    // };

    console.log("demandes", demandes)

    return (
        <div className="SuiviRDV">
            <h1>Suivi de vos demandes</h1>
            {demandes.map(demande => (
                <div className='oneDemande'>
                    <div className='oneDemandeInfos'>
                        <p className='dateInfos'>{new Date(demande.date).toLocaleDateString("fr-FR", options)} / {demande.heure} </p>
                        <p className='medecinInfos'>{demande.idMedecin} / {demande.specialite}</p>
                    </div>
                    <div className='status'>
                        {demande.etat === "attente" ? (
                            <HourglassBottomIcon />
                        ) : demande.etat === "refuse" ? (
                            <BlockIcon />
                        ) : demande.etat === "accepte" ? (
                            <CheckCircleIcon />
                        ) : (
                            <p>Pas de statut</p>
                        )}
                        <p>{}</p>
                    </div>
                </div>
           ))}
        </div>
    );
}

export default SuiviRDV;
