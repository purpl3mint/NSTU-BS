import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'

export const ScheduleCard = (props) => {
    const {id, timeStart, timeEnd, deviceGroupId, playlistId, deleteHandler} = props

    const clickHandler = useCallback(() => {
        const storageName = "currentSchedule"
        localStorage.setItem(storageName, JSON.stringify({"id": id}))
    }, [id])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink to={"/schedules/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>
                    <span className="schedule-card__time">{timeStart + " - " + timeEnd}</span><br/>
                    <span className="schedule-card__devices">Группа устройств: {deviceGroupId}</span><br/>
                    <span className="schedule-card__playlist">Плейлист: {playlistId}</span>
                </NavLink>
            </div>
            <NavLink className="col s1 btn" to={"/schedule/edit/" + id} onClick={clickHandler}>Изменить</NavLink>
            <button name={id} className="btn col s1" onClick={deleteHandler}>Удалить</button>
        </div>
    )
}