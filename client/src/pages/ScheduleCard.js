import React from "react"
import { NavLink } from 'react-router-dom'

export const ScheduleCard = (props) => {
    const {id, timeStart, timeEnd, deviceGroupId, playlistId} = props

    return (
        <NavLink key={id} to={"/schedules/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>
            <span className="schedule-card__time">{timeStart + " - " + timeEnd}</span><br/>
            <span className="schedule-card__devices">Группа устройств: {deviceGroupId}</span><br/>
            <span className="schedule-card__playlist">Плейлист: {playlistId}</span>
        </NavLink>
    )
}