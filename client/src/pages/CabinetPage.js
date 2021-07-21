import React from "react"

export const CabinetPage = () => {
    //Подключить redux для данных пользователя!!!
    //const data = JSON.parse(localStorage.getItem('userData'))
    //const username = data.username

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