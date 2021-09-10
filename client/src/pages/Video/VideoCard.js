import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
const jwt = require('jsonwebtoken')

export const VideoCard = (props) => {
    const {name, id, deleteHandler} = props
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