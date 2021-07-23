import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { PlaylistCard } from "./PlaylistCard"

export const PlaylistsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [playlists, setPlaylists] = useState()

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/playlist", "GET")
            const newData = data.map(p => <PlaylistCard key={p.id} name={p.name} id={p.id}/>)
            setPlaylists(newData)
        } catch (e) {}
    }, [request, setPlaylists])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])

    return (
        <div>
            <h1>Плейлисты</h1>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { playlists }
            </div>
        </div>
    )
}