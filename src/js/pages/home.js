import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

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

       /*  api.get('module/getAllSkills')
        .then(res => dispatch({type: 'SET_ALL_SKILLS', payload: res.data})) */
    }, [])




    return (
        <section className="rows flexEvenly">
            <h1 className="cols-12 centerText">Home</h1>
            {moduleIsloading && <span>loading ...</span>}
            {
                modules && modules.map(module => {
                return (<div className="cols-10 csm-3 card" key={'module' + module.module.id}>
                    <h2 className="cardTitle">{module.module.title}</h2>
                    <div className="cardBody">
                    <ul>
                {module.skills.map(skill => { return (<li key={'skill' + skill.id} onClick={() => { dispatch({type: 'SET_CURRENT_SKILL', payload: {module: module.module, details: skill}}); history.push("/skillDetails") }}> <span>{skill.title}</span> { userIslogged && <div>Your Level: {userNotes[skill.id]};   Average Level: {promotionNotes[skill.id]}</div> }</li> )})}
                    </ul>
                    </div>
                </div>)
                })
            }
        </section>
            )
}

export default Home;