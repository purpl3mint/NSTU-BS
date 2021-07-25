import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const PlaylistAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [form, setForm] = useState({
        name: ''
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
            await request("/api/playlist/create", "POST", {...form})
            message("Плейлист успешно создан")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Создание нового плейлиста</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название плейлиста</label>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/playlists" />}

        </div>
    )
}