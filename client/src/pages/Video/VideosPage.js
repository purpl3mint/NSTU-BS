import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { VideoCard } from "./VideoCard"
import { useDispatch, useSelector } from "react-redux"
import { videoLoadVideos, videoSetSucceed } from "../../store/actionCreators/videoActionCreator"

export const VideosPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()

    const videos = useSelector(state => {
        const videosRaw = state.videoReducer.videos
        const videos = videosRaw.map(v => 
        <VideoCard 
            key={v.id} 
            name={v.name} 
            id={v.id}
            link={v.link}
            source={v.source}
        />)
        return videos
    })

    const initializeHandler = useCallback ( () => {
        dispatch(videoLoadVideos())
        dispatch(videoSetSucceed(false))
    }, [dispatch])
    
    useEffect( () => {initializeHandler()}, [initializeHandler])
    /*
    const [videos, setVideos] = useState([])

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/content/" + event.target.name, "DELETE")
            message(data)
            const videosUpd = await request("/api/content", "GET")
            const newVideosUpd = videosUpd.map(v => <VideoCard key={v.id} name={v.name} id={v.id} deleteHandler={deleteHandler}/>)
            setVideos(newVideosUpd)
        } catch (e) {}
    }, [message, request, setVideos])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/content", "GET")
            const newData = data.map(v => <VideoCard key={v.id} name={v.name} id={v.id} deleteHandler={deleteHandler}/>)
            setVideos(newData)
        } catch (e) {}
    }, [request, setVideos, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])
    */

    return (
        <div>
            <h1>Видео</h1>
            <NavLink key="new" to="/video/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { videos }
            </div>
        </div>
    )
}