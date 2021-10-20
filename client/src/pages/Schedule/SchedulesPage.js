import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { ScheduleCard } from "./ScheduleCard"
import { useDispatch, useSelector } from 'react-redux'
import { scheduleLoadAll } from "../../store/actionCreators/scheduleActionCreator"

export const SchedulesPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()

    const schedules = useSelector(state => {
        const rawShedules = state.scheduleReducer.schedules

        console.log("raw schedules: ", rawShedules);
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


    /*
    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/schedule/" + event.target.name, "DELETE")
            message(data)
            const scheduleUpd = await request("/api/schedule", "GET")
            const newScheduleUpd = scheduleUpd.map(s => s.playlist
            ? <ScheduleCard 
                key={s.id} 
                id={s.id} 
                timeStart={s.time_start} 
                timeEnd={s.time_end} 
                deviceGroupId={s.devicegroupId} 
                playlistId={s.playlistId}
                deleteHandler={deleteHandler}
            />
            : true)
            setSchedules(newScheduleUpd)
        } catch (e) {}
    }, [message, request, setSchedules])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/schedule", "GET")
            
            console.log("recv schedules > ", data);

            const newData = data.map(s => s.playlist 
                ? <ScheduleCard 
                    key={s.id} 
                    id={s.id} 
                    timeStart={s.time_start} 
                    timeEnd={s.time_end} 
                    deviceGroupName={s.devicegroup.name} 
                    playlistName={s.playlist.name}
                    deleteHandler={deleteHandler}
                />
                : true)

            console.log("transformed data > ", newData);
            setSchedules(newData)
        } catch (e) {}
    }, [request, setSchedules, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    */

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