import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { useDispatch, useSelector } from "react-redux"
import { userLoadGroup, userSetGroup, userSetGroupsForm } from "../../store/actionCreators/userActionCreator"

export const UserSetGroupPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()
    /*
    const [isSucceed, setSucceed] = useState(false)
    const [userGroups, setUserGroups] = useState(null)
    const [username, setUsername] = useState("")
    const [id, setId] = useState(0)
    const [level, setLevel] = useState(0)
    const [form, setForm] = useState({
        group_id: 0
    })
    */

    const isSucceed = useSelector(state => state.userReducer.isSucceed)
    const userGroups = useSelector(state => state.userReducer.userGroups)
    const username = useSelector(state => state.userReducer.currentUsername)
    const id = useSelector(state => state.userReducer.currentUserId)
    const level = useSelector(state => state.userReducer.currentUserLevel)
    const form = useSelector(state => state.userReducer.groupForm)


    const initializeHandler = useCallback(() => {
        dispatch(userLoadGroup())
    }, [dispatch])

    const changeHandler = useCallback((e) => {
        dispatch(userSetGroupsForm(e.target.name, e.target.value))
    }, [dispatch])

    const saveHandler = useCallback(() => {
        dispatch(userSetGroup(form, id))
    }, [dispatch, form, id])

    useEffect( () => { initializeHandler() }, [initializeHandler])

    /*
    const initializeHandler = useCallback(async () => {
        try {
            const dataStorage = JSON.parse(localStorage.getItem("currentUser"))
            if (dataStorage && dataStorage.username) {
                setUsername(dataStorage.username)
            }
            if (dataStorage && dataStorage.id) {
                setId(dataStorage.id)
            }
            if (dataStorage && dataStorage.level) {
                setLevel(dataStorage.level)
            }

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

    */

    return (
        <div>
            <h1>Изменение группы пользователя</h1>

            <div className="row">
                <div className="col s12">
                    <span>Имя пользователя: {username}</span>
                    {   level === 1 &&
                        <div className="row">
                            <select className="col s6 browser-default" name="group_id" onChange={changeHandler}>
                                <option value="" disabled selected>Выберите группу пользователей</option>
                                {userGroups}
                            </select>
                        </div>
                    }
                    {   level !== 1 && 
                        <div className="row">
                            <span className="col s6">Внимание! Данному пользователю нельзя присвоить группу</span>
                        </div>
                    }
                    
                    {   level === 1 &&
                        <button className="btn blue-grey darken-1" onClick={saveHandler}>Сохранить</button>
                    }
                </div>
            </div>

            {isSucceed && <Redirect to="/users" />}

        </div>
    )
}