import React, { useEffect, useRef, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const VideoAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [form, setForm] = useState({
        name: '',
        filetype: '',
        file: null
    })

    const formRef = useRef(null)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const changeFile = event => {
        setForm({...form, [event.target.name]: event.target.files[0]})
    }

    const createHandler = async event => {
        event.preventDefault()
        try {
            const data = new FormData(formRef.current)

            //await request("/api/content/create", "POST", data, {"Content-Type": "multipart/form-data"})
            message("Функция в стадии разработки")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Загрузка нового видео</h1>

            <div className="row">
                <form ref={formRef} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название видео</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <select className="browser-default" name="filetype" onChange={changeHandler}>
                                <option value="" disabled selected>Выберите формат файла</option>
                                <option value=".mp4">.mp4</option>
                            </select>
                        </div>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            { !form.filetype && <input type="file" name="file" accept={form.filetype} disabled/> }
                            { form.filetype && <input type="file" name="file" accept={form.filetype} onChange={changeFile}/> }
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </form>
            </div>

            {isSucceed && <Redirect to="/videos" />}

        </div>
    )
}