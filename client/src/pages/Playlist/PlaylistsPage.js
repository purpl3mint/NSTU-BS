import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { PlaylistCard } from "./PlaylistCard"

export const PlaylistsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [playlists, setPlaylists] = useState()

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/playlist/" + event.target.name, "DELETE")
            message(data)
            const playlistUpd = await request("/api/playlist", "GET")
            const newPlyalistUpd = playlistUpd.map(p => <PlaylistCard key={p.id} name={p.name} id={p.id} deleteHandler={deleteHandler}/>)
            setPlaylists(newPlyalistUpd)
        } catch (e) {}
    }, [message, request, setPlaylists])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/playlist", "GET")
            const newData = data.map(p => <PlaylistCard key={p.id} name={p.name} id={p.id} deleteHandler={deleteHandler}/>)
            setPlaylists(newData)
        } catch (e) {}
    }, [request, setPlaylists, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])

    return (
        <div>
            <h1>Плейлисты</h1>
            <NavLink key="new" to="/playlist/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { playlists }
            </div>
        </div>
    )
}