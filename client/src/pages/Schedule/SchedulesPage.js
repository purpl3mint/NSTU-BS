import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { ScheduleCard } from "./ScheduleCard"
import { useDispatch, useSelector } from 'react-redux'
import { scheduleLoadAll } from "../../store/actionCreators/scheduleActionCreator"

export const SchedulesPage = () => {
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const schedules = useSelector(state => {
        const rawShedules = state.scheduleReducer.schedules

        const transformedSchedules = rawShedules.map(s => s.playlist
            ? <ScheduleCard 
                key={s.id} 
                id={s.id} 
                timeStart={s.time_start} 
                timeEnd={s.time_end} 
                deviceGroupName={s.devicegroup.name} 
                playlistName={s.playlistId}
            />
            : true)

        return transformedSchedules
    })

    const loadHandler = useCallback( () => {
        dispatch(scheduleLoadAll())
    }, [dispatch])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Расписания показов</h1>
            <NavLink key="new" to="/schedule/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { schedules }
            </div>
        </div>
    )
}