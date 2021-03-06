import React, { useCallback, useEffect } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { videoDeleteVideo, videoSetCurrentVideo, videoSetUserLevel } from "../../store/actionCreators/videoActionCreator"
const jwt = require('jsonwebtoken')

export const VideoCard = (props) => {
    const {name, id, link, source} = props

    let proxy = window.location.origin + ':80/stat/';
    if (process.env.NODE_ENV === 'development'){
        proxy = "http://localhost:5000/stat/"
    }
    
    const dispatch = useDispatch()

    const level = useSelector(state => state.videoReducer.userLevel)

    const clickHandler = useCallback( () => {
        let finalLink
        if (source === "static")
            finalLink = proxy + link
        else
            finalLink = link 

        dispatch(videoSetCurrentVideo(id, name, finalLink, source))
    }, [dispatch, id, name, link, source, proxy])

    const deleteHandler = useCallback( () => {
        dispatch(videoDeleteVideo(id))
    }, [dispatch, id])

    useEffect( () => {
        const token = JSON.parse(localStorage.getItem('userData')).token
        const data = jwt.decode(token)

        if (data) {
            dispatch(videoSetUserLevel(data.level))
        } else {
            dispatch(videoSetUserLevel('неизвестно'))
        }
    }, [dispatch])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/video/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                    onClick={clickHandler}
                >
                    {name}
                </NavLink>
            </div>
            {   (level === 1 || level === 2) && 
                <button name={id} className="btn" onClick={deleteHandler}>
                    <i className="material-icons">delete</i>
                </button>
            }
        </div>
    )
}