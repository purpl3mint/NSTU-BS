import React from "react"
import { NavLink } from 'react-router-dom'

export const UserGroupCard = (props) => {
    const {name, id} = props

    return (
        <NavLink key={id} to={"/usergroups/" + id} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>{name}</NavLink>
    )
}