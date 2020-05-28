import React, { useEffect } from 'react'
import api from '../utils/api'

import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { render } from 'react-dom'

const Home = () => {

    let history = useHistory();
    const dispatch = useDispatch()
    const moduleIsloading = useSelector(state => state.tree.modules.isLoading)
    const modules = useSelector(state => state.tree.modules.collection)

    const userIslogged = useSelector(state => state.auth.user.isLogged)
    const user = useSelector(state => state.auth.user.detail)
    const userNotes = useSelector(state => state.auth.user.notes)
    const promotionNotes = useSelector(state => state.auth.user.promotionNotes)


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
        <section className="rows flexEvenly flexVaStart">
            <h1 className="cols-12 centerText pageTitle">Home</h1>
            {moduleIsloading && <span>loading ...</span>}
            {
                modules && modules.map(module => {
                return (<div className="cols-10 csl-3 card" key={'module' + module.module.id}>
                    <h2 className="cardTitle">{module.module.title}</h2>
                    <div className="cardBody">
                    <ul>
                {module.skills.map(skill => { return (<li key={'skill' + skill.id} onClick={() => { dispatch({type: 'SET_CURRENT_SKILL', payload: {module: module.module, details: skill}}); history.push("/skillDetails") }}> 
                <span>{skill.title}</span> { userIslogged && <div><p>Your Level:
                {stars(parseInt(userNotes[skill.id]), `me${skill.id}`)}
                </p>   
                    <p>Average Level: {stars(parseInt(promotionNotes[skill.id]), `pro${skill.id}`)}</p></div> }</li> )})}
                    </ul>
                    </div>
                </div>)
                })
            }
        </section>
            )
}

export default Home;