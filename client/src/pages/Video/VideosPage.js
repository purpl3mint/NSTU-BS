import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { VideoCard } from "./VideoCard"

export const VideosPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [videos, setVideos] = useState([])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/content", "GET")
            const newData = data.map(v => <VideoCard key={v.id} name={v.name} id={v.id}/>)
            setVideos(newData)
        } catch (e) {}
    }, [request, setVideos])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Поиск видео</h1>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { videos }
            </div>
        </div>
    )
}