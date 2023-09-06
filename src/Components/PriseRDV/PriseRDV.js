import React from 'react';
import { db } from '../../firebaseConfig'
import './PriseRDV.css'

import { collection, getDocs, addDoc } from 'firebase/firestore'
import times from "./time.json";
import AjoutUsersDB from '../AddUsersDB/AddUsersDB';

import { useNavigate } from 'react-router-dom';

function PriseRDV() {
    const [speciality, setSpeciality] = React.useState('');
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [medecin, setMedecin] = React.useState([]);
    const [selectedMedecin, setSelectedMedecin] = React.useState({});
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [clientId, setClientId] = React.useState(''); 

    const [bcgImage, setBcgImage] = React.useState('/Images/background2.jpg');

    React.useEffect(() => {
        document.body.style.backgroundImage = `url(${bcgImage})`;

    }, [bcgImage]);
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const values = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log(date, time, speciality, values);
            console.log(typeof values[0].nom, typeof values[0].spécialité, typeof values[0].dates);
            if (date && time && speciality) {
                setMedecin([]); // Réinitialiser la liste des médecins
                let newAvailable = values.filter(value => value.spécialité.includes(speciality));
                newAvailable.forEach(element => {
                    Object.entries(element.dates).forEach(([key, value]) => {
                        if (key === date) {
                            Object.entries(value).forEach(([key2, value2]) => {
                                if (key2 === time) {
                                    if (value2 === 'disponible') {
                                        setMedecin(prevMedecin => [...prevMedecin, {nom: element.nom, id: element.id}]);
                                    }
                                }
                            });
                        }
                    });
                });
            }
        })();
    }, [speciality, date, time]);

    React.useEffect(() => {
        if(medecin.length > 0)
            setSelectedMedecin(medecin[0].id);
        else
            setSelectedMedecin(null);
    },[medecin]);

    const changeSpeciality = (event) => {
        const value = event.target.value;
        setSpeciality(value);
    }

    const changeDate = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const changeTime = (event) => {
        const value = event.target[event.target.value - 1].text;
        setTime(value);
    }

    const changeBackground = () => {
        setBcgImage('/Images/background.jpg');
    };

    const resetBackground = () => {
        setBcgImage('/Images/background2.jpg');
    };

    const goToSuiviRDV = (event) => {
        if(clientId.length < 3) return;
        return navigate('/suiviRDV', { state: { clientId } });
    }

    const changeClientId = (event) => {
        const value = event.target.value;
        setClientId(value);
    }

    const changeMedecin = (event) => {
        const value = event.target.value;
        setSelectedMedecin(value);
    }

    const prendreRDV = async () => {
        const demandeCollectionRef = collection(db, 'demandes');
        const clientsCollectionRef = collection(db, 'clients');
        const clients = await getDocs(clientsCollectionRef);
        let userId = ""
        const userExist = clients.docs.find(doc => doc.data().prenom === firstName && doc.data().nom === lastName);

        if (!userExist) {
            const document = await addDoc(clientsCollectionRef, {
                nom: lastName,
                prenom: firstName,
            })
            userId = document.id;
        }

        const addNewDemande = async () => {
            await addDoc(demandeCollectionRef, {
                idClient: userExist ? userExist.id : userId,
                idMedecin: selectedMedecin,
                date: date,
                heure: time,
                specialite: speciality,
                etat: 'attente'
            })
        }
        addNewDemande();
    }

    const changeFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const changeLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    return (
        <div className="PriseRDV">
            <div className="header">
                <div className="demandeContainer">
                    <input className="inputClient" type="text" onChange={changeClientId} placeholder="ID du client" />
                    <button className="Demande" onClick={goToSuiviRDV}>Suivi des demandes</button>
                </div>
                <div className='PriseRDV-jesuismedecin-Container'>
                    <button className="PriseRDV-jesuismedecin" onMouseOver={changeBackground} onMouseOut={resetBackground}>Je suis médecin</button>
                </div>
            </div>
            <div className="PriseRDV-infos">
                <input className="input" type="text" placeholder="Nom" onChange={changeLastName} />
                <input className="input" type="text" placeholder="Prénom" onChange={changeFirstName}/>
                <select className='input' onChange={changeSpeciality}>
                    <option defaultValue disabled selected>Sélectionnez une spécialité</option>
                    <option value="Cardiologue">Cardiologue</option>
                    <option value="Généraliste">Généraliste</option>
                    <option value="Pédiatre">Pédiatre</option>
                    <option value="Urologue">Urologue</option>
                    <option value="Neurologue">Neurologue</option>
                    <option value="Radiologue">Radiologue</option>
                    <option value="Chiurgien">Chiurgien</option>
                    <option value="Aide-soignant">Aide-soignant</option>
                    <option value="Allergologue">Allergologue</option>
                </select>
                <input className='input' type="date" placeholder="Date" onChange={changeDate} />
                <select className='input' onChange={changeTime}>
                    {times.combinations.map(({ id, timeRange }) => {
                        return <option value={id}>{timeRange}</option>
                    })}
                </select>
                <select onChange={changeMedecin}>
                    {medecin.map(({ id, nom }) => {
                        return <option value={id} key={id}>{nom}</option>
                    })}
                </select>
            </div>
            <div className="PriseRDV-image">
                <p>Choisissez une date</p>
            </div>
            <div className="PriseRDV-valider">
                <button className='prendreRDV' onClick={prendreRDV}>Prendre rendez-vous</button>
            </div>
            <AjoutUsersDB />
        </div>
    );
}

export default PriseRDV;
