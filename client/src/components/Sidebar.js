import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="collection col s2" style={{padding: 0}}>
            <NavLink to="/videos" className="collection-item">Видео</NavLink>
            <NavLink to="/playlists" className="collection-item">Плейлисты</NavLink>
            <NavLink to="/schedules" className="collection-item">Расписания</NavLink>
            <NavLink to="/devicegroups" className="collection-item">Группы устройств</NavLink>
            <NavLink to="/usergroups" className="collection-item">Группы пользователей</NavLink>
        </div>
    )
}