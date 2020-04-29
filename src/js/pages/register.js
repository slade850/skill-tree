import React, {useState} from 'react';
import api from '../utils/api';

const Register = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [promos, setPromos] = useState([]);
    const [firstName, setFristName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [promotion_id, setPromotion] = useState(0);


    api.get('user/promotions')
    .then(res => setPromos(res.data))
    .catch(err => setPromos(['error']))

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);

        const body = {
            firstName,
            lastName,
            email,
            password,
            promotion_id
        }
        console.log(body)
        api.post('user/register', body)
        .then(response => {
            setMessage(response.data.message)
            console.log(response.data.user)
        })
        .catch(err => {
            console.log(err.response)
            setMessage(err.response.data.message);
        })
        .finally(() => setIsLoading(false) )
    }    

    return(
        <form onSubmit={handleSubmit} >
        <div className="">
            <label>Prénom</label>
            <input type="text" onChange={(ev)=> setFristName(ev.target.value)} name='firstName' value={firstName} required />
        </div>
        <div className="">
            <label>Nom</label>
            <input type="text" onChange={(ev)=> setLastName(ev.target.value)} name='lastName' value={lastName} required />
        </div>
        <div className="">
            <label>Email</label>
            <input type="email" onChange={(ev)=> setEmail(ev.target.value)} name='email' value={email} required />
        </div>
        <div className="">
            <label>Password</label>
            <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
        </div>
        <div className="">
            <label>Promotion</label>
            <select name='promotion_id' onChange={(ev)=> setPromotion(ev.target.value)}>
                { promos.map((promo, i) => <option value={promo.id} key={i + 'option'}>{promo.name}</option>) }
            </select>
        </div>
        <button type="submit">S'enregistrer</button><br />
        {message && <span>{message}</span>}
        </form>
    )
}

export default Register;