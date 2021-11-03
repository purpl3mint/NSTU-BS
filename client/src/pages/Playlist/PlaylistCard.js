import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { playlistDelete, playlistSetCurrent } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistCard = (props) => {
    const {name, id} = props
    const dispatch = useDispatch()
    
    const deleteHandler = useCallback( () => {
        dispatch(playlistDelete(id))
    }, [id, dispatch])

    const clickHandler = useCallback( () => {
        dispatch(playlistSetCurrent(id, name))
    }, [dispatch, id, name])


    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/playlists/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "50px", border: "1px solid grey"}}
                    onClick={clickHandler}
                >
                    {name}
                </NavLink>
            </div>
            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
        
    )
}