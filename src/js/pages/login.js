import React, {useState} from 'react';
import api from '../utils/api';

import { useSelector, useDispatch } from 'react-redux'

const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [formStatus, setFromStatus] = useState('Welcome')

    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage(null);
        setIsLoading(true);
        setFromStatus('please wait');
        const body = {
            email,
            password
        }
        api.post('user/authenticate', body)
        .then(response => {
            dispatch({type: 'SET_USER', payload: response.data.user})
            setMessage(response.data.message)
            setFromStatus('Welcome')
        })
        .catch(err => {
            setMessage(err.response.data.message);
            setFromStatus('Try again');
        })
        .finally(() => setIsLoading(false) )
    }

    return (
        <div className="">
            { isLoading ? <h2>loading</h2>
        : <form onSubmit={handleSubmit} >
            <h1>{formStatus}</h1>
            <div className="">
                <label>Email</label>
                <input type="email" onChange={(ev)=> setEmail(ev.target.value)} name='email' value={email} required />
            </div>
            <div className="">
                <label>Password</label>
                <input type="password" onChange={(ev)=> setPassword(ev.target.value)} minLength="8" name='password' value={password} required />
            </div>
            <button type="submit">Se Connecter</button><br />
            {message && <span>{message}</span>}
        </form> }
        </div>
    )
}

export default Login;