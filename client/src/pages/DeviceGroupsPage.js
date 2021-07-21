import React, { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { DeviceGroupCard } from "./DeviceGroupCard"

export const DeviceGroupsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [deviceGroups, setDeviceGroups] = useState([])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/devicegroup", "GET")
            const newData = data.map(g => <DeviceGroupCard name={g.name} id={g.id} outerLink={g.outer_link}/>)
            setDeviceGroups(newData)
        } catch (e) {}
    }, [request, setDeviceGroups])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])

    return (
        <div>
            <h1>Группы устройств</h1>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div className="progress"><div className="indeterminate"></div></div> }
                { deviceGroups }
            </div>
        </div>
    )
}