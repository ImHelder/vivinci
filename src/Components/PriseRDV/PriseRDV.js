import { db } from '../../firebaseConfig'
import './PriseRDV.css'

import { collection, addDoc } from 'firebase/firestore'
import times from "./time.json";

function PriseRDV() {
    const usersCollectionRef = collection(db, 'users')
    const addNewUser = async (nom, spécialité) => {
        const document = await addDoc(usersCollectionRef, {
            nom: nom,
            spécialité: spécialité,
            dates: {
                '2023-09-04': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-05': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-06': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-07': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-08':
                {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-09':
                {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-10': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-11': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-12': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-13': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                },
                '2023-09-14': {
                    '8:00 - 9:00': 'disponible',
                    '9:00 - 10:00': 'disponible',
                    '10:00 - 11:00': 'disponible',
                    '11:00 - 12:00': 'disponible',
                    '14:00 - 15:00': 'disponible',
                    '15:00 - 16:00': 'disponible',
                    '16:00 - 17:00': 'disponible'
                }

            }
        })



        const newCollectionRef = collection(db, 'users', document.id, 'name of new subcollection')

        await addDoc(newCollectionRef, {
            data: 'Hello there World',
        })
    }

    const addUser = async () => {
        addNewUser('Sylvie Taurin', ['Généraliste'])
        addNewUser('Alain Dezer', ['Pédiatre'])
        addNewUser('David Sarah', ['Urologue'])
        addNewUser('Christianne Denia', ['Neurologue', 'Cardiologue'])
        addNewUser('Marc Paular', ['Généraliste'])
        addNewUser('Aurelien Baly', ['Radiologue'])
        addNewUser('Clara Soiy', ['Chiurgien'])
        addNewUser('Dorianne Salma', ['Aide-soignant'])
        addNewUser('Daniel Ferrara', ['Allergologue'])
    }
    return (
        <div className="PriseRDV">
            <button className="PriseRDV-jesuismedecin">Je suis médecin</button>
            <div className="PriseRDV-infos">
                <input className="input" type="text" placeholder="Nom" />
                <input className="input" type="text" placeholder="Prénom" />
                <select className='input'><option value="Cardiologue">Cardiologue</option>
                    <option value="Généraliste">Généraliste</option>
                    <option value="Pédiatre">Pédiatre</option>
                    <option value="Urologue">Urologue</option>
                    <option value="Neurologue">Neurologue</option>
                    <option value="Radiologue">Radiologue</option>
                    <option value="Chiurgien">Chiurgien</option>
                    <option value="Aide-soignant">Aide-soignant</option>
                    <option value="Allergologue">Allergologue</option>
                </select>
                <input className='input' type="date" placeholder="Date" />
                <select className='input'>
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
