import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Header from './components/headers';
import Register from './pages/register';
import { getStorageUser } from './utils/local-storage';

const App = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        let storageUser = getStorageUser()
        if (storageUser) setUser(storageUser)
    }, [])

    return (
        <Router>
            <Header user={user} />
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login setUser={setUser} />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;