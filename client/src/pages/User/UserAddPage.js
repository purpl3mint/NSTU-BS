import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const UserAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [form, setForm] = useState({
        username: '',
        password: '',
        level: 0
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
            await request("/api/user/registration", "POST", {...form})
            message("Группа устройств успешно создана")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Создание нового пользователя</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="username" name="username" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="username">Имя пользователя</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="password" name="password" type="text" onChange={changeHandler} />
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <select className="col s6 browser-default" name="level" onChange={changeHandler}>
                            <option value="" disabled selected>Выберите уровень доступа</option>
                            <option value="0">Обычный пользователь</option>
                            <option value="1">Модератор</option>
                            <option value="2">Администратор</option>
                        </select>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/users" />}

        </div>
    )
}