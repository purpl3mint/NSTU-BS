import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const DeviceGroupAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [form, setForm] = useState({
        name: '',
        link: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            await request("/api/devicegroup/create", "POST", {...form})
            message("Группа устройств успешно создана")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Создание новой группы устройств</h1>

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
                            <input id="link" name="link" type="text" onChange={changeHandler} />
                            <label htmlFor="link">Ссылка на группу(необязательно)</label>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/devicegroups" />}

        </div>
    )
}