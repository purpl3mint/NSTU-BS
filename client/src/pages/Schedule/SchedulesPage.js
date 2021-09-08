import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { ScheduleCard } from "./ScheduleCard"

export const SchedulesPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [schedules, setSchedules] = useState([])

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/schedule/" + event.target.name, "DELETE")
            message(data)
            const scheduleUpd = await request("/api/schedule", "GET")
            const newScheduleUpd = scheduleUpd.map(s => 
            <ScheduleCard 
                key={s.id} 
                id={s.id} 
                timeStart={s.time_start} 
                timeEnd={s.time_end} 
                deviceGroupId={s.devicegroupId} 
                playlistId={s.playlistId}
                deleteHandler={deleteHandler}
            />)
            setSchedules(newScheduleUpd)
        } catch (e) {}
    }, [message, request, setSchedules])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/schedule", "GET")
            
            console.log(data);

            const newData = data.map(s => <ScheduleCard 
                    key={s.id} 
                    id={s.id} 
                    timeStart={s.time_start} 
                    timeEnd={s.time_end} 
                    deviceGroupName={s.devicegroup.name} 
                    playlistName={s.playlist.name}
                    deleteHandler={deleteHandler}
                />
                )
            setSchedules(newData)
        } catch (e) {}
    }, [request, setSchedules, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

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