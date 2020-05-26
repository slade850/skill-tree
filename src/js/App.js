import React from 'react';
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Header from './component/header';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import SkillDetails from './pages/skillDetail';


const App = () => {

    return (
        <Router>
            <Header />
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/skillDetails">
                        <SkillDetails />
                    </Route>
                    <Route path="/login">
                        <Login />
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