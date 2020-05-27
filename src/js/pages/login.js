import React, {useState, useEffect} from 'react';
import { doLogin } from '../store/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const message = useSelector(state => state.auth.authMessage.message);
    const logged = useSelector(state => state.auth.user.isLogged);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formStatus, setFromStatus] = useState('Welcome')

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        dispatch({type: "CLEAR_AUTH_MESSAGE"})
        const body = {
            email,
            password
        }
        dispatch(doLogin(body))
        .then(res => {
            setIsLoading(false)
        })
        .catch(err => {
            setIsLoading(false)
        })
    }
    
    if(logged) return <Redirect to="/" />

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