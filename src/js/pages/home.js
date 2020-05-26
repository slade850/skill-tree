import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect, useHistory } from 'react-router-dom'

const Home = () => {

    let history = useHistory();
    const dispatch = useDispatch()
    const moduleIsloading = useSelector(state => state.tree.modules.isLoading)
    const modules = useSelector(state => state.tree.modules.collection)

    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)
    const userNotes = useSelector(state => state.auth.user.notes)
    const promotionNotes = useSelector(state => state.auth.user.promotionNotes)

    useEffect(() => {
        dispatch({type: 'FETCH_MODULES'})
        api.get('module/modulesWithSkills')
        .then(res => {
            dispatch({type: 'SET_MODULES', payload: res.data})
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
        <section>
            <h1>Home</h1>
            {moduleIsloading && <span>loading ...</span>}
            {
                modules && modules.map(module => {
                return (<div key={'module' + module.module.id}>
                    <h2>{module.module.title}</h2>
                    <ul>
                {module.skills.map(skill => { return (<li key={'skill' + skill.id} onClick={() => { dispatch({type: 'SET_CURRENT_SKILL', payload: {module: module.module, details: skill}}); history.push("/skillDetails") }}> <span>{skill.title}</span> { userIslogged && <div>Your Level: {userNotes[skill.id]};   Average Level: {promotionNotes[skill.id]}</div> }</li> )})}
                    </ul>
                </div>)
                })
            }
            <button onClick={() => dispatch({type: 'CLEAR_MODULES'})}>Clear Module</button>
        </section>
            )
}

export default Home;