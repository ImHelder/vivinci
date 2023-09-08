import React from 'react';
import { db } from '../../firebaseConfig'
import './PriseRDV.css'

import { collection, getDocs, addDoc } from 'firebase/firestore'
import times from "./time.json";
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

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
    const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
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
                                if (key2 === times.combinations.find(({ id }) => id === time).timeRange) {
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

    const changeTime = (event) => {
        setTime(event.target.value);
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
                heure: times.combinations.find(({ id }) => id === time).timeRange,
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
                <a href='https://www.shutterstock.com/fr' target='_blank' rel="noreferrer">
                    <img className="logo" src="/Images/Vivinci5.png" alt="logo"/>
                </a>
                <Button style={{ borderRadius: 15, marginTop: 20 }} className="button" onMouseOver={changeBackground} onMouseOut={resetBackground} onClick={() => navigate('/PageMedecin')}><p className='buttonText'>Je suis médecin</p></Button>
            </div>
            <div className="PriseRDV-infos">
                <TextField 
                    InputProps={{ sx: { borderRadius: 3 } }}
                    className="secondInput" 
                    variant="outlined"
                    label="Nom"
                    value={lastName} 
                    required
                    onChange={changeLastName} 
                />
                <TextField 
                    InputProps={{ sx: { borderRadius: 3 } }}
                    className="secondInput" 
                    variant="outlined"
                    label="Prénom"
                    value={firstName} 
                    required
                    onChange={changeFirstName} 
                    sx={{marginTop: 3}}
                />
                <TextField 
                    InputProps={{ sx: { borderRadius: 3 } }}
                    className="secondInput" 
                    variant="outlined"
                    label="Spécialité"
                    value={speciality}
                    required
                    onChange={changeSpeciality} 
                    select
                    sx={{marginTop: 3}}
                >
                    <MenuItem defaultValue disabled selected>Sélectionnez une spécialité</MenuItem>
                    <MenuItem value="Cardiologue">Cardiologue</MenuItem>
                    <MenuItem value="Généraliste">Généraliste</MenuItem>
                    <MenuItem value="Pédiatre">Pédiatre</MenuItem>
                    <MenuItem value="Urologue">Urologue</MenuItem>
                    <MenuItem value="Neurologue">Neurologue</MenuItem>
                    <MenuItem value="Radiologue">Radiologue</MenuItem>
                    <MenuItem value="Chiurgien">Chiurgien</MenuItem>
                    <MenuItem value="Aide-soignant">Aide-soignant</MenuItem>
                    <MenuItem value="Allergologue">Allergologue</MenuItem>
                </TextField>

                <DatePicker 
                    label="Date du rendez-vous" 
                    value={moment(date)} 
                    minDate={moment()} 
                    format='YYYY-MM-DD'
                    onChange={(value) => setDate(value.format("YYYY-MM-DD"))}
                    className="datePicker"
                    sx={{ marginTop: 3 }}
                />               
                <TextField 
                    InputProps={{ sx: { borderRadius: 3 } }}
                    className="secondInput" 
                    variant="outlined"
                    label="Choisir un horaire"
                    value={time} 
                    required
                    onChange={changeTime} 
                    select
                    sx={{marginTop: 3}}
                >
                    {times.combinations.map(({ id, timeRange }) => {
                        return <MenuItem value={id}>{timeRange}</MenuItem>
                    })}
                </TextField>
                
        
                <div className='medecinContainer'>
                    <TextField 
                        InputProps={{ sx: { borderRadius: 3 } }}
                        className="secondInput" 
                        variant="outlined"
                        label="Choisir un médecin"
                        value={selectedMedecin} 
                        required
                        onChange={changeMedecin} 
                        select
                        sx={{marginTop: 3, marginBottom: 3}}
                    >
                        {medecin.map(({ id, nom }) => {
                            return <MenuItem value={nom} key={id}>{nom}</MenuItem>
                        })}
                    </TextField>
                    <img className='photo' src={getImage(selectedMedecin)} alt='medecin' />
                </div>

                <div className="ligneDemande">
                    <Button style={{ borderRadius: 15 }} className='input button' onClick={prendreRDV}><p className='buttonText'>Prendre rendez-vous</p></Button>
                    <div className="DemandeItem">
                        <TextField 
                            InputProps={{ sx: { borderRadius: 3 } }}
                            className="inputClient" 
                            variant="outlined"
                            label="ID du client"
                            value={clientId} 
                            required
                            onChange={changeClientId} 
                            sx={{marginRight: 3}}
                        />
                        <Button style={{ borderRadius: 15}} className="button" onClick={goToSuiviRDV}><p className='buttonText'>Suivi des demandes</p></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriseRDV;
