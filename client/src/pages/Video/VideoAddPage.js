import React, { useCallback } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { videoAdd, videoSetAddForm } from "../../store/actionCreators/videoActionCreator"
import { useMessage } from "../../hooks/message.hook"

export const VideoAddPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.videoReducer.isSucceed)
    const form = useSelector(state => state.videoReducer.addVideoForm)

    const changeHandler = useCallback ( (e) => {
        dispatch(videoSetAddForm(e.target.name, e.target.value))
    }, [dispatch])

    const changeFile = useCallback ( (e) => {
        dispatch(videoSetAddForm(e.target.name, e.target.files[0]))
    }, [dispatch])

    const createHandler = useCallback ( (e) => {
        e.preventDefault()

        if (!form.name) {
            message("Ошибка: не задано имя контента")
            return
        }
        if (!form.filetype) {
            message("Ошибка: не задан тип контента")
            return
        } else {
            switch (form.filetype){
                case "youtube":
                    if (!form.outerLink) {
                        message("Ошибка: не задана ссылка на контент")
                        return
                    }
                    break
                case ".mp4":
                    if (!form.file) {
                        message("Ошибка: не указан файл")
                        return
                    }
                    break
                default:
                    return
            }
        }
        
        dispatch(videoAdd(form))
    }, [dispatch, message, form])

    return (
        <div>
            <h1>Загрузка нового видео</h1>

            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название видео</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <select defaultValue="" className="browser-default" name="filetype" onChange={changeHandler}>
                                <option value="" disabled>Выберите формат файла</option>
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