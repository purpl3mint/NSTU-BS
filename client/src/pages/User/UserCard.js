import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch} from "react-redux"
import { 
    userDeleteUser,
    userSetCurrentId, 
    userSetCurrentLevel, 
    userSetCurrentUsername 
} from "../../store/actionCreators/userActionCreator"

export const UserCard = (props) => {
    const {username, id, level, usergroup} = props
    const [levelName, setLevelName] = useState('неизвестно')
    const [usergroupOutput, setUserGroupOutput] = useState('')

    const dispatch = useDispatch()

    const clickHandler = useCallback(() => {
        dispatch(userSetCurrentId(id))
        dispatch(userSetCurrentUsername(username))
        dispatch(userSetCurrentLevel(level))
    }, [dispatch, id, level, username])

    const deleteHandler = useCallback(() => {
        dispatch(userDeleteUser(id))
    }, [dispatch, id])
    

    useEffect( () => {
        switch(level) {
            case 0:
                setLevelName('Пользователь')
                setUserGroupOutput('Пользователь')
                break
            case 1:
                setLevelName('Модератор')
                setUserGroupOutput(usergroup)
                break
            case 2:
                setLevelName('Администратор')
                setUserGroupOutput('Администратор')
                break
            default:
                setLevelName('Неизвестно')
                setUserGroupOutput('Неизвестно')
        }
    }, [level, usergroup])

    return (
        <div className="row">
            <div className="col s10">
                <NavLink 
                    to={"/user/" + id} 
                    className="collection-item card" 
                    style={{marginBottom: "25px", border: "1px solid grey"}}
                >
                    {username}<br/>
                    Тип: {levelName}<br />
                    Группа пользователей: {usergroupOutput}
                </NavLink>
            </div>

            <NavLink className="btn" to={"/user/edit/" + id} onClick={clickHandler} style={{marginRight: "10px"}}>
                <i className="material-icons">edit</i>
            </NavLink>

            <button name={id} className="btn" onClick={deleteHandler}>
                <i className="material-icons">delete</i>
            </button>
        </div>
        
    )
}