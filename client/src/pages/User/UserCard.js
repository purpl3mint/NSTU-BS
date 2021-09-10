import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'

export const UserCard = (props) => {
    const {username, id, level, usergroup, deleteHandler} = props
    const [levelName, setLevelName] = useState('неизвестно')

    const clickHandler = useCallback(() => {
        const storageName = "currentUser"
        localStorage.setItem(storageName, JSON.stringify({"username": username, "id": id, "level": level}))
    }, [username, id])

    useEffect( () => {
        switch(level) {
            case 0:
                setLevelName('Пользователь')
                break
            case 1:
                setLevelName('Модератор')
                break
            case 2:
                setLevelName('Администратор')
                break
        }
    }, [level])

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
                    Группа пользователей: {usergroup}
                </NavLink>
            </div>
            <NavLink className="col s1 btn" to={"/user/edit/" + id} onClick={clickHandler}>Изменить</NavLink>
            <button name={id} className="btn col s1" onClick={deleteHandler}>Удалить</button>
        </div>
        
    )
}