import React from 'react';
import { db } from '../../firebaseConfig'
import './PriseRDV.css'

import { collection, addDoc, getDocs } from 'firebase/firestore'
import times from "./time.json";
import { redirect, useNavigate } from 'react-router-dom';

function PriseRDV() {

    const [available, setAvailable] = React.useState([]);
    const [speciality, setSpeciality] = React.useState('');
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const values = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            console.log(speciality);
            const newAvailable = values.filter(user => user.spécialité.includes(speciality));
            
            console.log(newAvailable, date, time);
            setAvailable(newAvailable);
        })();
    }, [speciality, date, time]);


    const changeSpeciality = (event) => {
        const value = event.target.value;
        setSpeciality(value);
    }

    const changeDate = (event) => {
        const value = event.target.value;
        console.log(value);
        setDate(value);
    }

    const changeTime = (event) => {
        const value = event.target.text;
        console.log(event.target[event.target.value - 1].text);
        setTime(value);
    }

    const goToSuiviRDV = (event) => {
        return navigate('/suiviRDV');
    }

    return (
        <div className="PriseRDV">
            <div className="header">
                <div className="demandeContainer">
                    <input className="inputClient" type="text" placeholder="ID du client" />
                    <button className="Demande" onClick={goToSuiviRDV}>Suivi des demandes</button>
                </div>
                <div className='PriseRDV-jesuismedecin-Container'>
                    <button className="PriseRDV-jesuismedecin">Je suis médecin</button>
                </div>
            </div>
            <div className="PriseRDV-infos">
                <input className="input" type="text" placeholder="Nom" />
                <input className="input" type="text" placeholder="Prénom" />
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
                <input className='input' type="text" placeholder="Médecin" />
            </div>
            <div className="PriseRDV-image">
                <p>Choisissez une date</p>
            </div>
            <div className="PriseRDV-valider">
                <p>Choisissez une date</p>
            </div>
        </div>
    );
}

export default PriseRDV;
