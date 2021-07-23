import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { DeviceGroupCard } from "./DeviceGroupCard"

export const DeviceGroupsPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const [deviceGroups, setDeviceGroups] = useState([])

    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/devicegroup/" + event.target.name, "DELETE")
            message(data)
            const deviceGroupUpd = await request("/api/devicegroup", "GET")
            const newDeviceGroupUpd = deviceGroupUpd.map(g => <DeviceGroupCard key={g.id} name={g.name} id={g.id} outerLink={g.outer_link} deleteHandler={deleteHandler}/>)
            setDeviceGroups(newDeviceGroupUpd)
        } catch (e) {}
    }, [message, request, setDeviceGroups])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/devicegroup", "GET")
            const newData = data.map(g => <DeviceGroupCard key={g.id} name={g.name} id={g.id} outerLink={g.outer_link} deleteHandler={deleteHandler}/>)
            setDeviceGroups(newData)
        } catch (e) {}
    }, [request, setDeviceGroups, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])

    return (
        <div>
            <h1>Группы устройств</h1>
            <NavLink key="new" to="/devicegroup/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div key="devgroup_loader" className="progress"><div className="indeterminate"></div></div> }
                { deviceGroups }
            </div>
        </div>
    )
}