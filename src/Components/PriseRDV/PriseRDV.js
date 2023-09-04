import './PriseRDV.css';
import times from "./time.json";

function PriseRDV() {
    return (
        <div className="PriseRDV">
            <button className="PriseRDV-jesuismedecin">Je suis médecin</button>
            <div className="PriseRDV-infos">
                <p>Choisissez une date</p>
                <input type="text" placeholder="Nom" />
                <input type="text" placeholder="Prénom" />
                <select><option value="Cardiologue">Cardiologue</option>
                    <option value="Généraliste">Généraliste</option>
                    <option value="Pédiatre">Pédiatre</option>
                    <option value="Urologue">Urologue</option>
                    <option value="Neurologue">Neurologue</option>
                    <option value="Radiologue">Radiologue</option>
                    <option value="Chiurgien">Chiurgien</option>
                    <option value="Aide-soignant">Aide-soignant</option>
                    <option value="Allergologue">Allergologue</option>
                </select>
                <input type="date" placeholder="Date" />
                <select>
                    {times.combinations.map(({id, timeRange}) => {
                        return <option value={id}>{timeRange}</option>
                    })}
                </select>
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
