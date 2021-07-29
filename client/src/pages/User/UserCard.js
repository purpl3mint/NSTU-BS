import React from "react"
import { NavLink } from 'react-router-dom'

export const UserCard = (props) => {
    const {username, id, deleteHandler} = props

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/user/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {username}
                </NavLink>
            </div>
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
        
    )
}