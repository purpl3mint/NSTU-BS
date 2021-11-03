import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { ScheduleCard } from "./ScheduleCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import { scheduleLoadAll, scheduleSetUserData, scheduleGetUserData } from "../../store/actionCreators/scheduleActionCreator"

export const SchedulesPage = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.scheduleReducer.preloader)
    const deviceGroupId = useSelector(state => state.scheduleReducer.userData.deviceGroupId)
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
        const token = JSON.parse(localStorage.getItem('userData')).token
        dispatch(scheduleGetUserData(token))
        dispatch(scheduleLoadAll(deviceGroupId))

    }, [dispatch, deviceGroupId])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Расписания показов</h1>

            { loading && <Preloader />}

            { !loading && 
            <div>
                <NavLink key="new" to="/schedule/add" className="waves-effect waves-light btn">Добавить</NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { schedules }
                </div>
            </div>
            }
            
        </div>
    )
}