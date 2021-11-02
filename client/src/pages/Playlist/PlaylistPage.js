import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { PlaylistVideoCard } from "./PlaylistVideoCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { playlistLoadContent, playlistNewSetSucceed } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistPage = () => {    const dispatch = useDispatch()

    const id = useSelector(state => state.playlistReducer.currentPlaylistId)
    const name = useSelector(state => state.playlistReducer.currentPlaylistName)
    const loading = useSelector(state => state.playlistReducer.loading)
    const videos = useSelector(state => {
        const rawVideos = state.playlistReducer.currentPlaylistContents
        const transformedVideos = rawVideos.map(v => 
            v.contentId
            ?   <PlaylistVideoCard 
                    key={v.id} 
                    name={v.content.name} 
                    id={v.id}
                    playlistId={id}
                    link={v.content.link}
                    source={v.content.source}
                    isApproved={v.content.is_approved}
                    contentId={v.contentId}
                />
            :   <PlaylistVideoCard 
                    key={v.id} 
                    name={v.content.name} 
                    id={v.id}
                    playlistId={id}
                    link={v.content.link}
                    source={v.content.source}
                    isApproved={v.content.is_approved}
                    contentId={v.content_id}
                />
        )

        return transformedVideos
    })

    const loadHandler = useCallback (event => {
        dispatch(playlistLoadContent(id))
        dispatch(playlistNewSetSucceed(false))
    }, [dispatch, id])

    useEffect(() => {
        loadHandler()
    }, [loadHandler])

    return (
        <div>
            <h1>Плейлист: {name}</h1>
            { loading && <Preloader />}

            { !loading && 
            <div> 
                <NavLink key="new" to={"/playlist/addcontent/" + id} className="waves-effect waves-light btn">Добавить видео</NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { videos }
                </div>
            </div> 
            }
            
        </div>
    )
}