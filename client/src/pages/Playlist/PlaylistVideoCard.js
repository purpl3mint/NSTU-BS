import React from "react"
import { NavLink } from 'react-router-dom'

export const PlaylistVideoCard = (props) => {
    const {name, id, deleteHandler} = props
    
    const clickHandler = e =>  {
        const storageName = "currentVideo"

        localStorage.setItem(storageName, JSON.stringify({"name": name, "id": id}))
    }

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/video/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                    onClick={clickHandler}
                >
                    <span>Id видео: {id}</span>
                </NavLink>
            </div>
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
    )
}