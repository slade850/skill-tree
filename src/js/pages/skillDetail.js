import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'

const SkillDetail = () => {

    const dispatch = useDispatch()
    const currentModule = useSelector(state => state.tree.currentSkill.module)
    const currentSkill = useSelector(state => state.tree.currentSkill.details)

    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)
    const userNotes = useSelector(state => state.auth.user.notes)
    const promotionNotes = useSelector(state => state.auth.user.promotionNotes)

    console.log(currentModule)


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
            <h1>{currentModule.title}</h1>
            <h2>{currentSkill.title}</h2>
            <p>{currentSkill.description}</p>
            { userIslogged && <div><p>Your Level: {userNotes[currentSkill.id]}</p>  <p>Average Level: {promotionNotes[currentSkill.id]}</p></div> }
        </section>
            )
}

export default SkillDetail;