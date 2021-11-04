import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const jwt = require('jsonwebtoken')

export const Sidebar = () => {
    const [token, setToken] = useState(null)
    const [level, setLevel] = useState(0)
    const [component, setComponent] = useState(
        <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
        </div>
    )

    useEffect(() => {
        setToken(JSON.parse(localStorage.getItem('userData')).token)
        const data = jwt.decode(token)

        if (data) {
            setLevel(data.level)
        } else {
            setLevel('неизвестно')
        }

        let newComponent
        switch(level){
            case 0: 
                newComponent = (
                    <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                        <NavLink to="/videos" className="collection-item">Видео</NavLink>
                    </div>
                )
                break
            case 1:
                newComponent = (
                    <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                        <NavLink to="/videos" className="collection-item">Видео</NavLink>
                        <NavLink to="/playlists" className="collection-item">Плейлисты</NavLink>
                        <NavLink to="/schedules" className="collection-item">Расписания</NavLink>
                    </div>
                )
                break
            case 2:
                newComponent = (
                    <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                        <NavLink to="/videos" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>smart_display</i>
                            <span className="hide-on-med-and-down">Видео</span>
                        </NavLink>
                        <NavLink to="/playlists" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>playlist_play</i>
                            <span className="hide-on-med-and-down">Плейлисты</span>
                        </NavLink>
                        <NavLink to="/schedules" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>date_range</i>
                            <span className="hide-on-med-and-down">Расписания</span>
                        </NavLink>
                        <NavLink to="/devicegroups" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>devices</i>
                            <span className="hide-on-med-and-down">Группы устройств</span>
                        </NavLink>
                        <NavLink to="/usergroups" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>groups</i>
                            <span className="hide-on-med-and-down">Группы пользователей</span>
                        </NavLink>
                        <NavLink to="/users" className="collection-item" style={{display: "flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>person</i>
                            <span className="hide-on-med-and-down">Пользователи</span>
                        </NavLink>
                    </div>
                )
                break
            default:
                newComponent = (
                    <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}>
                        <NavLink to="/videos" className="collection-item">Видео</NavLink>
                    </div>
                )
        }
        setComponent(newComponent)

    }, [level, token])
    

    return component || <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}></div>
}