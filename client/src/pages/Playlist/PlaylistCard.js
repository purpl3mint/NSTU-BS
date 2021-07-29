import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'

export const PlaylistCard = (props) => {
    const {name, id, deleteHandler} = props

    const clickHandler = useCallback( event => {
        const storageName = "currentPlaylist"
        localStorage.setItem(storageName, JSON.stringify({"name": name, "id": id}))
    }, [id, name])

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
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
        
    )
}