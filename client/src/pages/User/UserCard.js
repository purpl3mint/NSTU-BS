import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'

export const UserCard = (props) => {
    const {username, id, level, deleteHandler} = props

    const clickHandler = useCallback(() => {
        const storageName = "currentUser"
        localStorage.setItem(storageName, JSON.stringify({"username": username, "id": id, "level": level}))
    }, [username, id])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/user/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {username}<br/>
                    Уровень: {level}
                </NavLink>
            </div>
            <NavLink className="col s1 btn" to={"/user/edit/" + id} onClick={clickHandler}>Изменить</NavLink>
            <button name={id} className="btn col s1" onClick={deleteHandler}>Удалить</button>
        </div>
        
    )
}