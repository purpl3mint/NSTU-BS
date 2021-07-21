import React from "react"
import { NavLink } from 'react-router-dom'

export const VideoCard = (props) => {
    const {name, id} = props

    return (
        <NavLink key={id} to={"/videos/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>{name}</NavLink>
    )
}