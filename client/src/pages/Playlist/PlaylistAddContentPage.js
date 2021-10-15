import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { useDispatch, useSelector } from "react-redux"
import { playlistGetInsertableVideos, playlistNewContentForm, playlistAddContent } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistAddContentPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.playlistReducer.isSucceed)
    const playlistId = useSelector(state => state.playlistReducer.currentPlaylistId)   
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
            return;
        }

        if (form.position < 1) {
            message("Ошибка: некорректное значение позиции видео")
            return;
        }
            
        dispatch(playlistAddContent(playlistId, form.content_id, form.position))
    }, [dispatch, playlistId, form])

    useEffect( () => {
        loadHandler()
    }, [loadHandler])
    /*
    const initializeHandler = useCallback(async () => {
        const dataStorage = JSON.parse(localStorage.getItem("currentPlaylist"))

        if (dataStorage && dataStorage.id) {
            setPlaylistId(dataStorage.id)
        }
        
        const videosRequest = await request("/api/content", "GET")
        const videosFiltered = videosRequest.filter(v => v.is_approved)
        const videosTransformed = videosFiltered.map(v => <option name="content_id" value={v.id}>{v.name}</option>)
        setVideos(videosTransformed)
    }, [request])
    

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    
    useEffect(() => initializeHandler(), [initializeHandler])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            await request("/api/playlist/addcontent", "POST", {"content_id": form.content_id, "position": form.position, "playlist_id": playlistId})
            message("Плейлист успешно обновлен")
            setSucceed(true)
        } catch (e) {}
    }
    */

    return (
        <div>
            <h1>Добавление видео в плейлист</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <select defaultValue="0" className="col browser-default" value={form.content_id} name="content_id" onChange={changeHandler}>
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

            {isSucceed && <Redirect to="/playlists" />}

        </div>
    )
}