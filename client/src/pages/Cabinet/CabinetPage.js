import React, { useEffect, useState } from "react"
const jwt = require('jsonwebtoken')

export const CabinetPage = () => {
    //Подключить redux для данных пользователя!!!
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [level, setLevel] = useState('')
    const [levelName, setLevelName] = useState('')

    useEffect( () => {
        setToken(JSON.parse(localStorage.getItem('userData')).token)
        const data = jwt.decode(token)

        if (data && data.username) {
            setUsername(data.username)
        } else {
            setUsername('неизвестно')
        }

        if (data) {
            setLevel(data.level)
        } else {
            setLevel('неизвестно')
        }

        switch(level) {
            case 'неизвестно': 
                setLevelName('не определена')
                break
            case 0: 
                setLevelName('Пользователь')
                break
            case 2: 
                setLevelName('Администратор')
                break
            case 1: 
                setLevelName('Модератор')
                break
        }

    }, [token, level])

    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                <span className="cabinet-page__username">Имя пользователя: {username}</span><br />
                <span className="cabinet-page__group">Тип пользователя: {levelName}</span>
            </div>
        </div>
    )
}