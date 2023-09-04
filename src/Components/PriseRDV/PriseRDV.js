import './PriseRDV.css';
import times from "./time.json";

function PriseRDV() {
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
                    {times.combinations.map(({id, timeRange}) => {
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
