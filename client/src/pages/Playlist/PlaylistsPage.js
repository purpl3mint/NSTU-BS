import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { PlaylistCard } from "./PlaylistCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { playlistLoadAll, playlistNewSetSucceed } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistsPage = () => {
    //const {loading} = useHttp()
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
    const loading = useSelector(state => state.playlistReducer.preloader)

    const loadHandler = useCallback( () => {
        dispatch(playlistNewSetSucceed(false))
        dispatch(playlistLoadAll())
    }, [dispatch])

    useEffect(() => loadHandler(), [loadHandler])

    return (
        <div>
            <h1>Плейлисты</h1>
            { loading && <Preloader />}

            { !loading &&
            <div>
                <NavLink key="new" to="/playlist/add" className="waves-effect waves-light btn">Добавить</NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { playlists }
                </div>
            </div>
            }

        </div>
    )
}