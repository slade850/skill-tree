import React, {useState} from 'react';
import api from '../utils/api'

const Home = (props) => {
    const [padawans, setPadawane] = useState(['Alexandre','Thibault', 'Clémence', 'Elena', 'Jega', 'Julien', 'Lilian', 'Rim', 'Shelley']);
    const [reloading, setReloading] = useState('');

    api.get('user/skillslevels')
        .then(response => console.log(response))

    const randomize = () => {
        let randomizeTab = padawans.sort(() => 0.5 - Math.random());
        setPadawane(randomizeTab);
        console.log(padawans);
        setReloading(padawans[Math.round(Math.random()*padawans.length)]);
    }

    return (
        <div className={reloading}>
            <table>
                <thead>
                    <tr>
                        <th>Padawans</th>
                    </tr>
                </thead>
                <tbody>
                    { padawans.map(pad => <tr key={pad}><td>{pad}</td></tr>) }
                </tbody>
            </table>
            <button type="button" onClick={() => {randomize()}}>randomise</button>
        </div>
    )
}

export default Home;