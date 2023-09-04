import './PriseRDV.css';

function PriseRDV() {
    return (
        <div className="PriseRDV">
            <button className="PriseRDV-jesuismedecin">Je suis médecin</button>
            <div className="PriseRDV-infos">
                <p>Choisissez une date</p>
                <input type="text" placeholder="Nom" />
                <input type="text" placeholder="Prénom" />
                <input type="text" placeholder="Spécialité" />
                <input type="date" placeholder="Date" />
                <input type="time" placeholder="Heure" />
                <input type="text" placeholder="Médecin" />
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
