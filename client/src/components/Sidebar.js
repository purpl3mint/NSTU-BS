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
                        <NavLink to="/videos" className="collection-item">Видео</NavLink>
                        <NavLink to="/playlists" className="collection-item">Плейлисты</NavLink>
                        <NavLink to="/schedules" className="collection-item">Расписания</NavLink>
                        <NavLink to="/devicegroups" className="collection-item">Группы устройств</NavLink>
                        <NavLink to="/usergroups" className="collection-item">Группы пользователей</NavLink>
                        <NavLink to="/users" className="collection-item">Пользователи</NavLink>
                    </div>
                )
                break
        }
        setComponent(newComponent)

    }, [level, token])
    

    return component || <div className="collection col s2" style={{padding: 0, marginRight: "4%"}}></div>
}