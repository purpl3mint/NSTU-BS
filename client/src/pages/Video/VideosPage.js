import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { VideoCard } from "./VideoCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { videoLoadVideos, videoSetSucceed } from "../../store/actionCreators/videoActionCreator"

export const VideosPage = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.videoReducer.preloader)
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

    return (
        <div>
            <h1>Видео</h1>

            { loading && <Preloader />}

            { !loading && 
            <div>
                <NavLink key="new" to="/video/add" className="waves-effect waves-light btn valign-wrapper" style={{display: "flex", width: '130px'}}>
                    <i className="material-icons">add</i>
                    <span>Добавить</span>
                </NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { videos }
                </div>
            </div>
            }
        </div>
    )
}