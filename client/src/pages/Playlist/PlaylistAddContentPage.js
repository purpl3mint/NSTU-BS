import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const PlaylistAddContentPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [playlistId, setPlaylistId] = useState(0)
    const [videos, setVideos] = useState(null)
    const [form, setForm] = useState({
        content_id: 0,
        position: 0
    })

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

    return (
        <div>
            <h1>Добавление видео в плейлист</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <select className="col browser-default" name="content_id" onChange={changeHandler}>
                            <option value="" disabled selected>Выберите видео</option>
                            {videos}
                        </select>
                        <div className="col">
                            <label htmlFor="position">Позиция видео в плейлисте</label>
                            <input type="number" name="position" id="position" min="1" onChange={changeHandler}/>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/playlists" />}

        </div>
    )
}