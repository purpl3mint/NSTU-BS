import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { videoDeleteVideo, videoSetCurrentVideo, videoSetUserLevel } from "../../store/actionCreators/videoActionCreator"
const jwt = require('jsonwebtoken')

export const VideoCard = (props) => {
    const {name, id, link, source} = props
    const proxy = "http://localhost:5000/"
    const dispatch = useDispatch()

    const level = useSelector(state => state.videoReducer.userLevel)
//    const [token, setToken] = useState('')

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
            //setLevel(data.level)
            dispatch(videoSetUserLevel(data.level))
        } else {
            dispatch(videoSetUserLevel('неизвестно'))
        }
    }, [dispatch])
    /*
    const [token, setToken] = useState('')
    const [level, setLevel] = useState('')
    
    const clickHandler = e =>  {
        const storageName = "currentVideo"

        localStorage.setItem(storageName, JSON.stringify({"name": name, "id": id}))
    }

    useEffect( () => {
        setToken(JSON.parse(localStorage.getItem('userData')).token)
        const data = jwt.decode(token)

        if (data) {
            setLevel(data.level)
        } else {
            setLevel('неизвестно')
        }
    }, [token])
    */

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
                <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
            }
        </div>
    )
}