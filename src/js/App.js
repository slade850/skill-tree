import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
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
import api from './utils/api';
import { getStorageLogged, clearLogged } from './utils/local-storage'


const App = () => {
    
    const dispatch = useDispatch();
    const userIslogged = useSelector(state => state.auth.user.isLogged);

    useEffect(() => {

        dispatch({type: 'FETCH_MODULES'})
        api.get('module/modulesWithSkills')
        .then(res => {
            dispatch({type: 'SET_MODULES', payload: res.data})
        })

        api.get('module/getAllSkills')
        .then(res =>{
            dispatch({type: 'SET_ALL_SKILLS', payload: res.data});
            dispatch({type: 'SET_CURRENT_SKILL', payload: {module: {id: res.data[1].module_id, title: res.data[1].module_title }, details: res.data[1]}})
        })

        getStorageLogged && api.get('user/info')
        .then(res => dispatch({type: 'SET_USER', payload: res.data}))
        .catch(err => {
            dispatch({type: 'SET_USER_LOGGED', payload: false})
            clearLogged
        })
    }, [])

    useEffect(() => {
        api.get('user/skillslevels')
        .then(res => {
            dispatch({type: "SET_USER_NOTES", payload: res.data})
        })
        .catch(err => {
            dispatch({type: "CLEAR_USER"})
        });

        api.get('user/groupAverageLevel')
        .then(res => {
            dispatch({type: "SET_USER_PROMOTION_NOTES", payload: res.data})
        })
        .catch(err => {
            dispatch({type: "CLEAR_USER"})
        })

    }, [userIslogged]);
    

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