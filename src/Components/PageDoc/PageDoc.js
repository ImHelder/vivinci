import React from 'react';
import { db } from '../../firebaseConfig'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { Block, CheckCircleOutline, Close, Done } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const OneDemande = ({ demande, accepterDemande, options }) => (
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
)


function PageDoc() {
    const [demandes, setDemandes] = React.useState([]);
    const [reload, setReload] = React.useState(0);
    const navigate = useNavigate();


    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'demandes'));
            const values = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
           
            const groupDemandesByStatus = values.reduce((acc, demande) => {
                const status = demande.etat;
                if (!acc[status]) {
                  acc[status] = [];
                }
                acc[status].push(demande);
                return acc;
              }, {});

            setDemandes(groupDemandesByStatus);
            console.log(demandes);

        })();
    }, [reload]);

    console.log("demandes", demandes)

    const accepterDemande = async (demandeId, etat) => {
        const demandeRef = doc(db, 'demandes', demandeId.id);
        await updateDoc(demandeRef, { etat: etat });
        // setDemandes(demandes.map(demande => demande.id === demandeId ? { ...demande, etat: 'accepte' } : demande));
        setReload(reload + 1);
    };

    const goBack = () => {
        navigate("/");
    }

    return (
        <div>
            <img className="logo2" src="/Images/Vivinci5.png" alt="logo" />
            <div className='customHeader'>
                <button className='goBackButton' onClick={goBack}>Retour</button>
                
                <h1>PageDoc</h1>
            </div>
            {demandes.attente?.length > 0 && (
                <div className='title'>
                    <h2>Demandes en attente</h2>
                    {demandes.attente?.map(demande => (
                        <OneDemande demande={demande} options={options} accepterDemande={accepterDemande} />
                    ))}
                </div>
            )}
           {demandes.accepte?.length > 0 && (
                <div className='title'>
                    <h2>Demandes validées</h2>
                    {demandes.accepte?.map(demande => (
                        <OneDemande demande={demande} options={options} accepterDemande={accepterDemande} />
                    ))}
                </div>
            )}
            {demandes.refuse?.length > 0 && (
                <div className='title'>
                    <h2>Demandes refusées</h2>
                    {demandes.refuse?.map(demande => (
                        <OneDemande demande={demande} options={options} accepterDemande={accepterDemande} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PageDoc