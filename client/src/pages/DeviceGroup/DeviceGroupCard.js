import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { deviceGroupDelete } from "../../store/actionCreators/deviceGroupActionCreator"

export const DeviceGroupCard = (props) => {
    const dispatch = useDispatch()
    const {name, id, outerLink} = props

    const deleteHandler = useCallback(() => {
        dispatch(deviceGroupDelete(id))
    }, [dispatch, id])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/watch/" + outerLink} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}
                </NavLink>
            </div>
            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
        
    )
}