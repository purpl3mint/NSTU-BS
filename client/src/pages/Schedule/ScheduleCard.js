import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { scheduleDelete, scheduleSetCurrent } from "../../store/actionCreators/scheduleActionCreator"

export const ScheduleCard = (props) => {
    const {id, timeStart, timeEnd, deviceGroupName, playlistName} = props
    const dispatch = useDispatch()

    const deleteHandler = useCallback( () => {
        dispatch(scheduleDelete(id))
    }, [dispatch, id])

    const clickHandler = useCallback(() => {
        dispatch(scheduleSetCurrent(id))
    }, [dispatch, id])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink to={"/schedules/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>
                    <span className="schedule-card__time">{timeStart + " - " + timeEnd}</span><br/>
                    <span className="schedule-card__devices">Группа устройств: {deviceGroupName}</span><br/>
                    <span className="schedule-card__playlist">Плейлист: {playlistName}</span>
                </NavLink>
            </div>
            
            <NavLink className="btn" to={"/schedule/edit/" + id} onClick={clickHandler} style={{marginRight: "10px"}}>
                <i className="material-icons">edit</i>
            </NavLink>
            
            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
    )
}