import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const ScheduleEditPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [id, setId] = useState(0)
    const [form, setForm] = useState({
        timeStart__hour: '00',
        timeStart__min: '00',
        timeStart__sec: '00',
        timeEnd__hour: '00',
        timeEnd__min: '00',
        timeEnd__sec: '00'
    })

    const initializeHandler = useCallback(() => {
        try {
            const dataStorage = JSON.parse(localStorage.getItem("currentSchedule"))
            if (dataStorage && dataStorage.id) {
                setId(dataStorage.id)
            }
            
            console.log("ID: ", id);
        } catch (e) {}
    }, [id])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => { initializeHandler() }, [initializeHandler])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
        console.log(form);
    }

    const saveHandler = async () => {
        try {
            const time_start = form.timeStart__hour + ":" + form.timeStart__min + ":" + form.timeStart__sec
            const time_end = form.timeEnd__hour + ":" + form.timeEnd__min + ":" + form.timeEnd__sec
            await request("/api/schedule/" + id, "PUT", {time_start, time_end})
            message("Данные успешно изменены")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Изменение расписания</h1>

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
                    <button className="btn blue-grey darken-1" onClick={saveHandler}>Сохранить</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/schedules" />}

        </div>
    )
}