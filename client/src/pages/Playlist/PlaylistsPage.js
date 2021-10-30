import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { PlaylistCard } from "./PlaylistCard"
import { useDispatch, useSelector } from "react-redux"
import { playlistLoadAll } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistsPage = () => {
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const playlists = useSelector(state => {
        const rawPlaylists = state.playlistReducer.playlists
        const transformedPlaylists = rawPlaylists.map(p => 
            <PlaylistCard 
                key={p.id} 
                name={p.name} 
                id={p.id} 
            />
        )
        return transformedPlaylists
    })

    const loadHandler = useCallback( () => {
        dispatch(playlistLoadAll())
    }, [dispatch])

    useEffect(() => loadHandler(), [loadHandler])

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