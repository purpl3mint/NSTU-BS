import React, {useContext, useEffect, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/user/login", "POST", {...form})
            auth.login(data)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Система вещания НГТУ</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" name="username" type="text" onChange={changeHandler} />
                                    <label htmlFor="username">Имя пользователя</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" type="password" onChange={changeHandler} />
                                    <label htmlFor="password">Пароль</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>Войти</button>
                    </div>

                </div>
            </div>
        </div>
    )
}