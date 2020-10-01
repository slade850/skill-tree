import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'

const SkillDetail = () => {

    const dispatch = useDispatch()
    const currentModule = useSelector(state => state.tree.currentSkill.module)
    const currentSkill = useSelector(state => state.tree.currentSkill.details)
    const allSkills = useSelector(state => state.tree.skills.skills)
    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const userNotes = useSelector(state => state.auth.user.notes)
    const promotionNotes = useSelector(state => state.auth.user.promotionNotes)

    let currentSkillId = parseInt(currentSkill.id);
    let skillLength = 0;
    for(let skill in allSkills){
            skillLength++;
    }

    const prevSkill = () => {
        currentSkillId == 1 ? dispatch({type: 'SET_CURRENT_SKILL', payload: {module: {id: allSkills[skillLength].module_id, title: allSkills[skillLength].module_title }, details: allSkills[skillLength]}}) 
        :
        dispatch({type: 'SET_CURRENT_SKILL', payload: {module: {id: allSkills[currentSkillId - 1].module_id, title: allSkills[currentSkillId - 1].module_title }, details: allSkills[currentSkillId - 1]}})
    }
    const nextSkill = () => {
        currentSkillId == skillLength ? dispatch({type: 'SET_CURRENT_SKILL', payload: {module: {id: allSkills[1].module_id, title: allSkills[1].module_title }, details: allSkills[1]}})
        :
        dispatch({type: 'SET_CURRENT_SKILL', payload: {module: {id: allSkills[currentSkillId + 1].module_id, title: allSkills[currentSkillId + 1].module_title }, details: allSkills[currentSkillId + 1]}})
    }


    const stars = (num, key) => {
        let result = []
        for(let i = 0 ; i < 3; i++){
            if(i < num){
                result.push(<svg key={"stars"+key+i} height="16" width="16"><polygon points="8,0 10.5,5 16,6 12,10 13,16 8,13 3,16 4,10 0,6 5.5,5" fill="Yellow" stroke="DarkKhaki" strokeWidth=".5" /></svg>)
            }else{
                result.push(<svg key={"stars"+key+i} height="16" width="16"><polygon points="8,0 10.5,5 16,6 12,10 13,16 8,13 3,16 4,10 0,6 5.5,5" fill="White" stroke="DarkKhaki" strokeWidth=".5" /></svg>)
            }
        }
        console.log(result.data)
        return <span>{result}</span>;
    }

    return (
        <section className="rows flexCenter">
            <div className="cols-10 centerText"><button className="btn" onClick={() => prevSkill()}><span>prev.</span></button><button className="btn" onClick={() => nextSkill()}><span>next</span></button></div>
            <div className="cols-10 prez">
            <div className="prezTitle">  
            <h1 >{currentModule.title}</h1>
            <h2>{currentSkill.title}</h2>
            </div>
            <div className="prezBody">
            <p>{currentSkill.description}</p>
            { userIslogged && <div><p>Your Level: {stars(parseInt(userNotes[currentSkill.id]), `me${currentSkill.id}`)}</p>  <p>Average Level: {stars(parseInt(promotionNotes[currentSkill.id]), `pro${currentSkill.id}`)}</p></div> }
            </div></div>
        </section>
            )
}

export default SkillDetail;