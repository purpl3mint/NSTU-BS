import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { usergroupDeleteGroup } from "../../store/actionCreators/usergroupActionCreator"

export const UserGroupCard = (props) => {
    const {name, id} = props
    const dispatch = useDispatch()

    const deleteHandler = useCallback( (e) => {
        dispatch(usergroupDeleteGroup(id))
    }, [dispatch, id])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/usergroups/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {name}
                </NavLink>
            </div>
            <button name={id} className="btn col s1 offset-s1" onClick={deleteHandler}>Удалить</button>
        </div>
    )
}