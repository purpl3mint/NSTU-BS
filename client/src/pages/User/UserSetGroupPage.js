import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"

export const UserSetGroupPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const [isSucceed, setSucceed] = useState(false)
    const [userGroups, setUserGroups] = useState(null)
    const [username, setUsername] = useState("")
    const [id, setId] = useState(0)
    const [form, setForm] = useState({
        group_id: 0
    })

    const initializeHandler = useCallback(async () => {
        try {
            const dataStorage = JSON.parse(localStorage.getItem("currentUser"))
            if (dataStorage && dataStorage.username) {
                setUsername(dataStorage.username)
            }
            if (dataStorage && dataStorage.id) {
                setId(dataStorage.id)
            }
            
            console.log("ID: ", id);

            const dataGroups = await request("/api/usergroup", "GET")
            const dataGroupsTransformed = dataGroups.map(g => <option value={g.id}>{g.name}</option>)
            setUserGroups(dataGroupsTransformed)
        } catch (e) {}
    }, [id, request])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => { initializeHandler() }, [initializeHandler])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
        console.log(form);
    }

    const saveHandler = async () => {
        try {
            await request("/api/user/setgroup/" + id, "PUT", {...form})
            message("Данные успешно изменены")
            setSucceed(true)
        } catch (e) {}
    }

    return (
        <div>
            <h1>Изменение группы пользователя</h1>

            <div className="row">
                <div className="col s12">
                    <span>Имя пользователя: {username}</span>
                    <div className="row">
                        <select className="col s6 browser-default" name="group_id" onChange={changeHandler}>
                            <option value="" disabled selected>Выберите группу пользователей</option>
                            {userGroups}
                        </select>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={saveHandler}>Сохранить</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/users" />}

        </div>
    )
}