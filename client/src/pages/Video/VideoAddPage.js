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
        outerLink: '',
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
            //const data = new FormData(formRef.current)

            //const data = await request("/api/content/create", "POST", form, {"Content-Type": "multipart/form-data"})

            //message("Функция в стадии разработки")

            if (form.filetype === "youtube") {
                /* NEXT LINE WORKS FOR YOUTUBE */
                const data = await request("/api/content/create", "POST", {...form})

                //console.log({...form});
                message(data.message)
            } else {            
                const data = new FormData()
                data.append("name", form.name)
                data.append("filetype", form.filetype)
                data.append("outerLink", form.outerLink)
                data.append("file", form.file)
                
                const XHRRequest = new XMLHttpRequest()
                XHRRequest.open("POST", "/api/content/create")
                XHRRequest.send(data)
            }

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
                                <option value="youtube">Youtube</option>
                            </select>
                        </div>
                    </div>
                    {form.filetype === "youtube" && <input type="text" name="outerLink" onChange={changeHandler} placeholder="Вставьте ссылку"/>}
                    {form.filetype === ".mp4" &&
                    
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            { form.filetype === ".mp4" && <input type="file" name="file" accept={form.filetype} onChange={changeFile}/> }
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    
                    //<span>Функция в стадии разработки</span>
                    }
                    {(form.filetype) && <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>}
                </form>
            </div>

            {isSucceed && <Redirect to="/videos" />}

        </div>
    )
}