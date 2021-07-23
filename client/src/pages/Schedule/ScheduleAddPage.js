import React, { useEffect, useState, useCallback } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const ScheduleAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [devicegroups, setDeviceGroups] = useState([])
    const [form, setForm] = useState({
        playlist: '',
        devices: '',
        timeStart: '',
        timeEnd: ''
    })

    const loadHandler = useCallback( async () => {
        const dataPlaylists = await request('/api/playlist', "GET")
        const dataDeviceGroups = await request('/api/devicegroup', "GET")

        setPlaylists(dataPlaylists)
        setDeviceGroups(dataDeviceGroups)
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
            await request("/api/schedule/create", "POST", {...form})
            message("Запись в расписании успешно создана")
            setSucceed(true)
        } catch (e) {}
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.timepicker');
        let options = {}
        var instances = window.M.Timepicker.init(elems, options);
    });

    return (
        <div>
            <h1>Создание новой записи в расписании</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название группы</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="timeStart" name="timeStart" type="text" className="timepicker" />
                            <label htmlFor="timeStart">Время начала</label>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/schedules" />}

        </div>
    )
}