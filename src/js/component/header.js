import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const Header = () => {

    const dispatch = useDispatch()
    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)


    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/skill">Home</Link>
                    </li>
                    {
                        userIslogged ?
                            (
                                <li>
                                    <span>{user.firstName}</span>
                                    <button onClick={() => dispatch({type: "CLEAR_USER"})}>Logout</button>
                                </li>
                            ) :
                            (
                                <li>
                                    <Link to="login">Login</Link>
                                </li>
                            )
                    }
                    { !userIslogged &&
                    <li>
                        <Link to="register">Register</Link>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;