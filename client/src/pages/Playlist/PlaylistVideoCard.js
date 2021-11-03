import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch} from "react-redux"
import { playlistDeleteContent } from "../../store/actionCreators/playlistActionCreator"
import { videoSetCurrentVideo } from "../../store/actionCreators/videoActionCreator"

export const PlaylistVideoCard = (props) => {
    const {name, id, playlistId, contentId, link, source, isApproved} = props
    const proxy = "http://localhost:5000/"
    const dispatch = useDispatch()

    const deleteHandler = useCallback(event => {
        dispatch(playlistDeleteContent(playlistId, id))
    }, [dispatch, id, playlistId])
    
    const clickHandler = useCallback( event => {
        let finalLink
        if (source === "static")
            finalLink = proxy + link
        else
            finalLink = link 
        
        dispatch(videoSetCurrentVideo(contentId, name, finalLink, source, isApproved))
    }, [dispatch, contentId, name, link, source, isApproved])
    

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
            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
    )
}