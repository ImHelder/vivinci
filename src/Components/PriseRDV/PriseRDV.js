import React from 'react';
import { db } from '../../firebaseConfig'
import './PriseRDV.css'

import { collection, getDocs, addDoc } from 'firebase/firestore'
import times from "./time.json";
import { useNavigate } from 'react-router-dom';

const getImage = (name) => {
    let image = "";
    switch (name) {
        case "David Sarah":
            image = "/Images/david.jpeg";
            break;
        case "Sylvie Taurin":
            image = "/Images/sylvie.jpeg";
            break;
        case "Alain Dezer":
            image = "/Images/alain.jpeg";
            break;
        case "Aurelien Baly":
            image = "/Images/aurelien.jpeg";
            break;
        case "Dorianne Salma":
            image = "/Images/dorianne.jpeg";
            break;
        case "Christianne Denia":
            image = "/Images/christianne.jpeg";
            break;
        case "Daniel Ferrara":
            image = "/Images/daniel.jpg";
            break;
        case "Marc Paular":
            image = "/Images/marc.jpeg";
            break;
        case "Clara Soiy":
            image = "/Images/clara.jpeg";
            break;
        default:
            image = "Images/image.png";
            break;
    }
    return image;
}

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
            const recupUsers = await getDocs(collection(db, 'users'));
            const users = recupUsers.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            const recupDemandes = await getDocs(collection(db, 'demandes'));
            const demandes = recupDemandes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            if (date && time && speciality) {
                setMedecin([]); // Réinitialiser la liste des médecins
                let newAvailable = users.filter(value => value.spécialité.includes(speciality));
                newAvailable.forEach(element => {
                    Object.entries(element.dates).forEach(([key, value]) => {
                        if (key === date) {
                            Object.entries(value).forEach(([key2, value2]) => {
                                if (key2 === time) {
                                    if (value2 === 'disponible') {
                                        setMedecin(prevMedecin => [...prevMedecin, { nom: element.nom, id: element.id }]);
                                    }
                                }
                            });
                        }
                    });
                });
                demandes.forEach(element => {
                    if (element.date === date && element.heure === time && element.etat === 'accepte') {
                        setMedecin(prevMedecin => prevMedecin.filter(medecin => medecin.nom !== element.idMedecin));
                    }
                });
            }
        })();
    }, [speciality, date, time]);

    React.useEffect(() => {
        if (medecin.length > 0)
            setSelectedMedecin(medecin[0].nom);

        else
            setSelectedMedecin(null);
    }, [medecin]);

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
        if (clientId.length < 3) return;
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
        if (firstName.length < 1 || lastName.length < 1 || !selectedMedecin || !date || !time || !speciality) {
            alert('Veuillez remplir tous les champs');
            return;
        };
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
                etat: 'attente',
                client: `${lastName} ${firstName}`
            })
        }
        addNewDemande();
        alert(`Votre demande a bien été prise en compte, voici votre ID pour accéder à vos réservations : ${userExist?.id || userId}`);
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

                <div className='PriseRDV-jesuismedecin-Container'>
                    <button className="PriseRDV-jesuismedecin" onMouseOver={changeBackground} onMouseOut={resetBackground} onClick={() => navigate('/PageMedecin')}>Je suis médecin</button>
                </div>
            </div>
            <div className="PriseRDV-infos">
                <input className="input" type="text" placeholder="Nom" onChange={changeLastName} />
                <input className="input" type="text" placeholder="Prénom" onChange={changeFirstName} />
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
                <input className='input' type="date" placeholder="Date" min={new Date().toISOString().slice(0,10)} onChange={changeDate} />
                <select className='input' onChange={changeTime}>
                    {times.combinations.map(({ id, timeRange }) => {
                        return <option value={id}>{timeRange}</option>
                    })}
                </select>
                <div className='medecinContainer'>
                    <select className='input' onChange={changeMedecin}>
                        {medecin.map(({ id, nom }) => {
                            return <option value={nom} key={id}>{nom}</option>
                        })}
                    </select>
                    <img className='photo' src={getImage(selectedMedecin)} alt='medecin' />
                </div>
                    <button className='prendreRDV input button' onClick={prendreRDV}>Prendre rendez-vous</button>
                <div className="demandeContainer">
                    <input className="inputClient" type="text" onChange={changeClientId} placeholder="ID du client" />
                    <button className="Demande button" onClick={goToSuiviRDV}>Suivi des demandes</button>
                </div>
            </div>
        </div>
    );
}

export default PriseRDV;
