import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const timeSlots = {
        '8H - 9H': 'disponible',
        '9H - 10H': 'disponible',
        '10H - 11H': 'disponible',
        '11H - 12H': 'disponible',
        '14H - 15H': 'disponible',
        '15H - 16H': 'disponible',
        '16H - 17H': 'disponible'
    }

const dates = {
        '2023-09-05': timeSlots,
        '2023-09-06': timeSlots,
        '2023-09-07': timeSlots,
        '2023-09-08': timeSlots,
        '2023-09-09': timeSlots,
        '2023-09-10': timeSlots,
        '2023-09-11': timeSlots,
        '2023-09-12': timeSlots,
        '2023-09-13': timeSlots,
        '2023-09-14': timeSlots,
        '2023-09-15': timeSlots,
        '2023-09-16': timeSlots,
    }

function AjoutUsersDB() {
    const usersCollectionRef = collection(db, 'users')
    const addNewUser = async (nom, spécialité) => {
        const document = await addDoc(usersCollectionRef, {
            nom: nom,
            spécialité: spécialité,
            dates: dates
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
        <div className="AjoutUsersDB">
            <button onClick={addUser}>Ajouter des utilisateurs</button>
        </div>  
    );
}

export default AjoutUsersDB;