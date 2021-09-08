import React, { useEffect, useState } from "react"
import jwt from 'jwt-decode'

export const CabinetPage = () => {
    //Подключить redux для данных пользователя!!!
    //const data = JSON.parse(localStorage.getItem('userData'))
    //const username = data.username
    //const [token, setToken] = useState('')
    //const [username, setUsername] = useState('')
    //const [level, setLevel] = useState(0)

    /*
    useEffect( () => {
        setToken(JSON.parse(localStorage.getItem('userData')).token)
        const data = jwt(token)
        setUsername(data.username)
        setLevel(data.level)
        console.log(data);
    }, [])
    */

    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                <span className="cabinte-page__username">Имя пользователя: неизвестно</span><br />
                <span className="cabinte-page__level">Уровень пользователя: неизвестно</span>
            </div>
        </div>
    )
}