import React, { useEffect, useState, useCallback } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { useDispatch, useSelector } from "react-redux"
import { 
    shedulesGetDeviceGroups, 
    shedulesGetPlaylists, 
    schedulesSetIsSucceed, 
    scheduleSetAddForm,
    schedulesAdd
} from "../../store/actionCreators/scheduleActionCreator"

const jwt = require('jsonwebtoken')

export const ScheduleAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()

    const store = useSelector(state => state.scheduleReducer)
    const isSucceed = useSelector(state => state.scheduleReducer.isSucceed)
    const playlists = useSelector(state => state.scheduleReducer.playlists)
    const devicegroups = useSelector(state => state.scheduleReducer.deviceGroups)
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
        dispatch(schedulesAdd(form))
    }, [dispatch, form])

    useEffect(() => {loadHandler()}, [loadHandler])
    /*
    const [isSucceed, setSucceed] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [devicegroups, setDeviceGroups] = useState([])
    const [form, setForm] = useState({
        playlist_id: '',
        devices_id: '',
        timeStart__hour: '00',
        timeStart__min: '00',
        timeStart__sec: '00',
        timeEnd__hour: '00',
        timeEnd__min: '00',
        timeEnd__sec: '00'
    })

    const loadHandler = useCallback( async () => {
        const token = JSON.parse(localStorage.getItem('userData')).token
        const dataToken = jwt.decode(token)
        let userid = 0

        console.log(dataToken);
        if (dataToken && dataToken.id) {
            userid = dataToken.id
        }

        let level = 0
        if (dataToken && dataToken.level) {
            level = dataToken.level
        }

        console.log(userid);
        
        const userData = await request('/api/user/' + userid, 'GET')


        const dataPlaylists = await request('/api/playlist', "GET")

        let dataDeviceGroups = []
        if (level === 1 && userData && userData.devices != {})
            dataDeviceGroups = userData.devices
        else
            dataDeviceGroups = await request('/api/devicegroup', "GET")
            

        const newDataPlaylists = dataPlaylists.map(d => <option value={d.id}>{d.name}</option>)
        const newDataDeviceGroups = dataDeviceGroups.map(d => <option value={d.id}>{d.name}</option>)

        setPlaylists(newDataPlaylists)
        setDeviceGroups(newDataDeviceGroups)
    }, [request, setPlaylists, setDeviceGroups])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => { loadHandler() }, [loadHandler])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            const time_start = form.timeStart__hour + ":" + form.timeStart__min + ":" + form.timeStart__sec
            const time_end = form.timeEnd__hour + ":" + form.timeEnd__min + ":" + form.timeEnd__sec
            await request("/api/schedule", "POST", {...form, time_start, time_end})
            message("Запись в расписании успешно создана")
            setSucceed(true)
        } catch (e) {}
    }
    */

    return (
        <div>
            <h1>Создание новой записи в расписании</h1>

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

            {isSucceed && <Redirect key="redirect" to="/schedules" />}

        </div>
    )
}