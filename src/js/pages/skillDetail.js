import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'

const SkillDetail = () => {

    const dispatch = useDispatch()
    const currentModule = useSelector(state => state.tree.currentSkill.module)
    const currentSkill = useSelector(state => state.tree.currentSkill.details)
    /* const allSkills = useSelector(state => state.tree.skills) */

    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)
    const userNotes = useSelector(state => state.auth.user.notes)
    const promotionNotes = useSelector(state => state.auth.user.promotionNotes)

    console.log(currentModule)



    return (
        <section>
            <h1>{currentModule.title}</h1>
            <h2>{currentSkill.title}</h2>
            <p>{currentSkill.description}</p>
            { userIslogged && <div><p>Your Level: {userNotes[currentSkill.id]}</p>  <p>Average Level: {promotionNotes[currentSkill.id]}</p></div> }
            <button>prev</button><button>next</button>
        </section>
            )
}

export default SkillDetail;