import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { VideoCard } from "./VideoCard"

export const UserGroupsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [userGroups, setUserGroups] = useState([])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/usergroup", "GET")
            const newData = data.map(g => <VideoCard name={g.name} id={g.id}/>)
            setUserGroups(newData)
        } catch (e) {}
    }, [request, setUserGroups])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])


    return (
        <div>
            <h1>Группы пользователей</h1>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { userGroups }
            </div>
        </div>
    )
}