import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { PlaylistVideoCard } from "./PlaylistVideoCard"
import { useDispatch, useSelector } from "react-redux"
import { playlistLoadContent, playlistNewSetSucceed } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistPage = () => {
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const id = useSelector(state => state.playlistReducer.currentPlaylistId)
    const name = useSelector(state => state.playlistReducer.currentPlaylistName)
    const videos = useSelector(state => {
        const rawVideos = state.playlistReducer.currentPlaylistContents
        //console.log("raw videos > ", rawVideos);
        const transformedVideos = rawVideos.map(v => 
            v.contentId
            ?   <PlaylistVideoCard 
                    key={v.id} 
                    name={v.content.name} 
                    id={v.id}
                    playlistId={id}
                    contentId={v.contentId}
                />
            :   <PlaylistVideoCard 
                    key={v.id} 
                    name={v.content.name} 
                    id={v.id}
                    playlistId={id}
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
    /*
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

            console.log(data);

            const newData = data.map(p => 
                p.contentId 
                    ? <PlaylistVideoCard key={p.id} name={p.name} id={p.contentId} deleteHandler={deleteHandler}/>
                    : <PlaylistVideoCard key={p.id} name={p.name} id={p.content_id} deleteHandler={deleteHandler}/>)
            setVideos(newData)
        } catch (e) {}
    }, [id, request, setVideos, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])
    */


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