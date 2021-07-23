import React from "react"
import { NavLink } from 'react-router-dom'

export const PlaylistCard = (props) => {
    const {name, id} = props

    return (
        <NavLink to={"/playlists/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>{name}</NavLink>
    )
}