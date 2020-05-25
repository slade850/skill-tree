import React, {useState, useEffect} from 'react';
import api from '../utils/api';
import { clearUser, getStorageUser } from '../utils/local-storage';

const Home = (props) => {
    const [modules, setModules] = useState([]);
    const [userNotes, setUserNotes] = useState({});
    const [promotionNote, setPromotionNote] = useState({});

    useEffect(() => {
        api.get('module')
        .then(res => {
            res.data.map(mod => {
                api.get(`module/${mod.id}/skills`)
                .then(skills => setModules(prev =>[...prev, skills.data]))
            })
        })
    }, [])

    useEffect(() => {
            api.get('user/skillslevels')
            .then(res => {
                setUserNotes(res.data)
            })
            .catch(err => {
                clearUser()
                props.setUser(null)
                setUserNotes({})
            });

            api.get('user/groupAverageLevel')
            .then(res => {
                console.log(res.data);
                setPromotionNote(res.data);
            })
            .catch(err => {
                clearUser()
                props.setUser(null)
                setPromotionNote({})
            })

            console.log(userNotes)
            console.log(promotionNote)
    }, [getStorageUser])


    return (
        <div className="">
            {
                modules.map(module => {
                return(<div key={module.module.id} className="">
                    <div>
                        <h2>Module{module.module.id}</h2>
                        {module.module.title}
                    </div>
                        { module.skills.map(skill => {
                                return (<div key={skill.id}>
                                    <div>{skill.title}</div>
                                    <div>
                                        {
                                            userNotes[skill.id] != undefined ? 
                                            <div>Votre note: {userNotes[skill.id]} <br />
                                            Note moyen de la Promo: {promotionNote[skill.id]}
                                            </div>
                                            : ''
                                        }
                                    </div>
                                    </div>)
                        })}
                </div>)})
            }
        </div>
    )
}

export default Home;