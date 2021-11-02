import React, { useEffect, useCallback } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { 
    shedulesGetDeviceGroups, 
    shedulesGetPlaylists, 
    schedulesSetIsSucceed, 
    scheduleSetAddForm,
    schedulesAdd
} from "../../store/actionCreators/scheduleActionCreator"
import { useMessage } from "../../hooks/message.hook"
import { Preloader } from '../../components/Preloader'

export const ScheduleAddPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

    const loading = useSelector(state => state.scheduleReducer.preloader)
    const isSucceed = useSelector(state => state.scheduleReducer.isSucceed)
    const playlists = useSelector(state => {
        const dataRaw = state.scheduleReducer.playlists
        const data = dataRaw.map(d => <option key={d.id} value={d.id}>{d.name}</option>)

        return data
    })
    const devicegroups = useSelector(state => {
        const dataRaw = state.scheduleReducer.deviceGroups
        const data = dataRaw.map(d => <option key={d.id} value={d.id}>{d.name}</option>)

        return data
    })
    const form = useSelector(state => state.scheduleReducer.addForm)

    const loadHandler = useCallback(() => {
        dispatch(shedulesGetDeviceGroups())
        dispatch(shedulesGetPlaylists())
        dispatch(schedulesSetIsSucceed(false))
    }, [dispatch])

    const changeHandler = useCallback((e) => {
        dispatch(scheduleSetAddForm(e.target.name, e.target.value))
    }, [dispatch])

    const createHandler = useCallback(() => {
        if (!form.playlist_id){
            message("Ошибка: не задан плейлист")
            return
        }
        if (!form.devices_id){
            message("Ошибка: не задана группа устройств")
            return
        }

        dispatch(schedulesAdd(form))
    }, [dispatch, message, form])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Создание новой записи в расписании</h1>

            { loading && <Preloader />}

            { !loading &&
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <span>Время начала</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input id="timeStart__hour" name="timeStart__hour" type="text" className="validate col s3" placeholder="ЧЧ" onChange={changeHandler}/>
                                <input id="timeStart__min" name="timeStart__min" type="text" className="validate col s3 offset-s1" placeholder="ММ" onChange={changeHandler}/>
                                <input id="timeStart__sec" name="timeStart__sec" type="text" className="validate col s3 offset-s1" placeholder="СС" onChange={changeHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <span>Время завершения</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input id="timeEnd__hour" name="timeEnd__hour" type="text" className="validate col s3" placeholder="ЧЧ" onChange={changeHandler}/>
                                <input id="timeEnd__min" name="timeEnd__min" type="text" className="validate col s3 offset-s1" placeholder="ММ" onChange={changeHandler}/>
                                <input id="timeEnd__sec" name="timeEnd__sec" type="text" className="validate col s3 offset-s1" placeholder="СС" onChange={changeHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label>Плейлист</label>
                            <select name="playlist_id" className="browser-default" onChange={changeHandler}>
                                <option value="" disabled selected>Выберите плейлист</option>
                                {playlists}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label>Группа устройств</label>
                            <select name="devices_id" className="browser-default" onChange={changeHandler}>
                                <option value="" disabled selected>Выберите группу устройств</option>
                                {devicegroups}
                            </select>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>
            }

            {isSucceed && <Redirect key="redirect" to="/schedules" />}

        </div>
    )
}