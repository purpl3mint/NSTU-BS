import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { UserGroupCard } from "./UserGroupCard"

export const UserGroupsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [userGroups, setUserGroups] = useState([])

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/usergroup/" + event.target.name, "DELETE")
            message(data)
            const deviceGroupUpd = await request("/api/usergroup", "GET")
            const newDeviceGroupUpd = deviceGroupUpd.map(g => <UserGroupCard key={g.id} name={g.name} id={g.id} deleteHandler={deleteHandler}/>)
            setUserGroups(newDeviceGroupUpd)
        } catch (e) {}
    }, [message, request, setUserGroups])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/usergroup", "GET")
            const newData = data.map(g => <UserGroupCard key={g.id} name={g.name} id={g.id} deleteHandler={deleteHandler}/>)
            setUserGroups(newData)
        } catch (e) {}
    }, [request, setUserGroups, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Группы пользователей</h1>
            <NavLink key="new" to="/usergroup/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { userGroups }
            </div>
        </div>
    )
}