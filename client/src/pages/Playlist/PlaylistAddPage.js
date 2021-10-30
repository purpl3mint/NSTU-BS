import React from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { playlistNewCreate, playlistNewSetForm } from "../../store/actionCreators/playlistActionCreator"
import { useMessage } from "../../hooks/message.hook"

export const PlaylistAddPage = () => {
    const dispatch = useDispatch()
    const message = useMessage()

    const isSucceed = useSelector(state => state.playlistReducer.isSucceed)
    const form = useSelector(state => state.playlistReducer.form)

    const changeHandler = event => {
        dispatch(playlistNewSetForm(event.target.name, event.target.value))
    }

    const createHandler = event => {
        if (!form.name) {
            message("Ошибка: не задано имя плейлиста")
            return
        }
        dispatch(playlistNewCreate(form))
    }

    return (
        <div>
            <h1>Создание нового плейлиста</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" value={form.name} className="validate" onChange={changeHandler} />
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