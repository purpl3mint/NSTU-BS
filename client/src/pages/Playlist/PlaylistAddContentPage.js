import React, { useCallback, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useMessage } from "../../hooks/message.hook"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { playlistGetInsertableVideos, playlistNewContentForm, playlistAddContent } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistAddContentPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.playlistReducer.isSucceed)
    const playlistId = useSelector(state => state.playlistReducer.currentPlaylistId)   
    const loading = useSelector(state => state.playlistReducer.loading)
    const videos = useSelector(state => { 
        const rawVideos = state.playlistReducer.allVideos
        const transformedVideos = rawVideos.map(v => 
            <option key={v.id} name="content_id" value={v.id}>{v.name}</option>
        )

        return transformedVideos
    }) 
    const form = useSelector(state => state.playlistReducer.addContentForm)

    const loadHandler = useCallback( () => {
        dispatch(playlistGetInsertableVideos())
    }, [dispatch])

    const changeHandler = useCallback( (event) => {
        dispatch(playlistNewContentForm(event.target.name, event.target.value))
    }, [dispatch])

    const createHandler = useCallback ( () => {
        if (!form.content_id) {
            message("Ошибка: не выбрано видео")
            return
        }

        if (form.position < 1) {
            message("Ошибка: некорректное значение позиции видео")
            return
        }
            
        dispatch(playlistAddContent(playlistId, form.content_id, form.position))
    }, [dispatch, message, playlistId, form])

    useEffect( () => {
        loadHandler()
    }, [loadHandler])


    return (
        <div>
            <h1>Добавление видео в плейлист</h1>

            { loading && <Preloader />}

            { !loading && 
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <select className="col browser-default" value={form.content_id} name="content_id" onChange={changeHandler}>
                            <option value="0" disabled>Выберите видео</option>
                            {videos}
                        </select>
                        <div className="col">
                            <label htmlFor="position">Позиция видео в плейлисте</label>
                            <input type="number" value={form.position} name="position" id="position" min="1" onChange={changeHandler}/>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>
            }

            {isSucceed && <Redirect to="/playlists" />}

        </div>
    )
}