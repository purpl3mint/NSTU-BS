import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { PlaylistVideoCard } from "./PlaylistVideoCard"

export const PlaylistPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [videos, setVideos] = useState(null)
    const [id, setId] = useState(1)
    const [name, setName] = useState("")

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/playlist/deletecontent/" + event.target.id, "DELETE")
            message(data)
            const videosUpd = await request("/api/playlist/content/" + id, "GET")
            const newVideosUpd = videosUpd.map(p => <PlaylistVideoCard key={p.id} name={p.name} id={p.id} deleteHandler={deleteHandler}/>)
            setVideos(newVideosUpd)
        } catch (e) {}
    }, [id, message, request, setVideos])

    const loadHandler = useCallback ( async () => {
        try {
            const dataStorage = JSON.parse(localStorage.getItem("currentPlaylist"))
            if (dataStorage && dataStorage.id) {
                setId(dataStorage.id)
            }

            if (dataStorage && dataStorage.name) {
                setName(dataStorage.name)
            }

            const data = await request("/api/playlist/content/" + id, "GET")
            const newData = data.map(p => <PlaylistVideoCard key={p.id} name={p.name} id={p.id} deleteHandler={deleteHandler}/>)
            setVideos(newData)
        } catch (e) {}
    }, [id, request, setVideos, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])

    return (
        <div>
            <h1>Плейлист: {name}</h1>
            <NavLink key="new" to={"/playlist/addcontent/" + id} className="waves-effect waves-light btn">Добавить видео</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { videos }
            </div>
        </div>
    )
}