import React from 'react';
import { db } from '../../firebaseConfig'
import './SuiviRDV.css'
import { collection, addDoc, getDocs } from 'firebase/firestore'

function SuiviRDV() {

    const [demandes, setDemandes] = React.useState([]);
    const [speciality, setSpeciality] = React.useState('');
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'demandes'));
            const _demandes = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            console.log({ _demandes });
            // const newAvailable = demandes.filter(user => user.spécialité.includes(speciality));
            
            // console.log(newAvailable, date, time);
            setDemandes(_demandes);
        })();
    }, []);

    return (
        <div className="SuiviRDV">
            {demandes.map(demande => (
                <div className='oneDemande'>
                    <div className='oneDemande-client'>
                        <p className='oneDemande-client-id'>{demande.idClient}</p>
                    </div>
                    <div className='oneDemande-medecin'>
                        <p className='oneDemande-medecin-id'>{demande.idMedecin}</p>
                    </div>
                    <div className='oneDemande-date'>
                        <p className='oneDemande-date-date'>{demande.date}</p>
                    </div>
                    <div className='oneDemande-demande'>
                        <p className='oneDemande-demande-demande'>{demande.demande}</p>
                    </div>
                    <div className='oneDemande-status'>
                        <p className='oneDemande-status-status'>{demande.status}</p>
                    </div>
                </div>
           ))}
        </div>
    );
}

export default SuiviRDV;
