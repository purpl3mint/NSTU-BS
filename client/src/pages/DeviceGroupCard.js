import React from "react"
import { NavLink } from 'react-router-dom'

export const DeviceGroupCard = (props) => {
    const {name, id, outerLink} = props

    return (
        <NavLink key={id} to={"/devicegroups/" + outerLink} className="collection-item card" style={{marginBottom: "50px", border: "1px solid grey"}}>{name}</NavLink>
    )
}