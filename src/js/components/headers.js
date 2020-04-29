import React from 'react';

import { Link } from 'react-router-dom';

const Header = (props) => {
    console.log('header props: ', props)
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {
                        props.user ?
                            (
                                <li>
                                    <span>{props.user.firstName}</span>
                                    <button>Logout</button>
                                </li>
                            ) :
                            (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )
                    }
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;