import React from 'react';
import { db } from '../../firebaseConfig'
import './SuiviRDV.css'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const OneDemande = ({ demande, options, deleteDemande }) => (
    <div className='oneDemande'>
        <div className='deleteIcon'>
            {demande.etat === "attente" && (
                <DeleteIcon onClick={() => deleteDemande(demande.id)} />
            )}
        </div>
        <div className='oneDemandeInfos'>
            <p className='dateInfos'>{new Date(demande.date).toLocaleDateString("fr-FR", options)} / {demande.heure} </p>
            <p className='medecinInfos'>{demande?.medecin?.nom || demande.idMedecin} / {demande.specialite}</p>
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
        </div>
    </div>
)

function SuiviRDV() {

    const [demandes, setDemandes] = React.useState([]);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const location = useLocation();
    const navigate = useNavigate();


    React.useEffect(() => {
        (async () => {
            const medecinSnapshot = await getDocs(collection(db, 'users'));
            const _medecins = medecinSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            const demandeSnapshot = await getDocs(collection(db, 'demandes'));
            const _demandes = demandeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, medecin: _medecins.find(medecin => medecin.id === doc.data().idMedecin), startHour: doc.data().heure.split("-")[0].split("h")[0], endHour: doc.data().heure.split("-")[1].split("h")[0].trim() }));

            const userDemandes = _demandes.filter(demande => demande.idClient === location.state.clientId);
            const sortedDemandsByDate = userDemandes.sort((a, b) => new Date(b.date) - new Date(a.date));

            const groups = sortedDemandsByDate.reduce((acc, demande) => {
                const date = new Date(demande.date).toLocaleDateString("fr-FR");
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(demande);
                return acc;
            }, {});

            const sortedDemandByHour = Object.entries(groups).map(([key, value]) => value.sort((a, b) => b.startHour - a.startHour)).flat();

            const groupDemandesByStatus = sortedDemandByHour.reduce((acc, demande) => {
                const status = demande.etat;
                if (!acc[status]) {
                  acc[status] = [];
                }
                acc[status].push(demande);
                return acc;
              }, {});

            setDemandes(groupDemandesByStatus);
        })();
    }, []);

    const deleteDemande = async (demandeId) => {
        const demandeRef = doc(db, 'demandes', demandeId);
        await deleteDoc(demandeRef);
        setDemandes(demandes.filter(demande => demande.id !== demandeId));
    };

    const goBack = () => {
        navigate("/");
    }

    return (
        <div className="SuiviRDV">
            <div className='customHeader'>
                <div className='containerButton'>
                    <button className='goBackButton' onClick={goBack}>Retour</button>
                </div>
                <h1>Suivi de vos demandes</h1>
            </div>
           {demandes.attente?.length > 0 && (
                <div className='title'>
                    <h2>Demande en attente</h2>
                    {demandes.attente?.map(demande => (
                        <OneDemande demande={demande} options={options} deleteDemande={deleteDemande} />
                    ))}
                </div>
            )}
           {demandes.valide?.length > 0 && (
                <div className='title'>
                    <h2>Demande en validée</h2>
                    {demandes.valide?.map(demande => (
                        <OneDemande demande={demande} options={options} deleteDemande={deleteDemande} />
                    ))}
                </div>
            )}
            {demandes.refuse?.length > 0 && (
                <div className='title'>
                    <h2>Demande en refusée</h2>
                    {demandes.refuse?.map(demande => (
                        <OneDemande demande={demande} options={options} deleteDemande={deleteDemande} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SuiviRDV;
