import React, {useState} from 'react';
import { setStorageUser } from '../utils/local-storage'
import api from '../utils/api';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitted, setFromSubmitted] = useState(false);
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
        console.log(body)
        api.post('user/authenticate', body)
        .then(response => {
            setStorageUser(response.data.user)
            props.setUser(response.data.user)
            setMessage(response.data.message)
            setFromStatus('Welcome')
        })
        .catch(err => {
            console.log(err.response)
            setMessage(err.response.data.message);
            setFromStatus('Try again');
        })
        .finally(() => setIsLoading(false) )

/*         setTimeout(() =>{
            setFromStatus('form receive')
            let response = Math.round(Math.random());
            response == 1 ? setMessage('User successfully connected') : setMessage('username or password missmatch')
            setTimeout(() => {setFromStatus('Welcome')}, 1200);
            setIsLoading(false);
        }, 2000) */
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