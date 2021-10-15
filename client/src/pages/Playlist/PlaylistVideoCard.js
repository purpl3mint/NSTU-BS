import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch} from "react-redux"
import { playlistDeleteContent } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistVideoCard = (props) => {
    const {name, id, playlistId, contentId} = props
    const dispatch = useDispatch()
    
    console.log("video card props > ", props);

    const deleteHandler = useCallback(event => {
        dispatch(playlistDeleteContent(playlistId, id))
    }, [dispatch, id, playlistId])
    
    /*!!! REMOVE THIS !!!*/
    const clickHandler = e =>  {
        const storageName = "currentVideo"

        localStorage.setItem(storageName, JSON.stringify({"name": name, "id": contentId}))
    }
    

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/video/" + contentId} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                    onClick={clickHandler}
                >
                    <span>{name}</span>
                </NavLink>
            </div>
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
    )
}