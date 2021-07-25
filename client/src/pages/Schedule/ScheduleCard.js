import React from "react"
import { NavLink } from 'react-router-dom'

export const ScheduleCard = (props) => {
    const {id, timeStart, timeEnd, deviceGroupId, playlistId, deleteHandler} = props

    return (
        <div className="row">
            <div className="col s10">
                <NavLink to={"/schedules/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>
                    <span className="schedule-card__time">{timeStart + " - " + timeEnd}</span><br/>
                    <span className="schedule-card__devices">Группа устройств: {deviceGroupId}</span><br/>
                    <span className="schedule-card__playlist">Плейлист: {playlistId}</span>
                </NavLink>
            </div>
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
    )
}