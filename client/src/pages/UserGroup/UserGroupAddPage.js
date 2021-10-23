import React, { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { useDispatch, useSelector } from "react-redux"
import { usergroupAdd, usergroupLoadDeviceGroups, usergroupSetForm } from "../../store/actionCreators/usergroupActionCreator"

export const UserGroupAddPage = () => {
    const {error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.usergroupReducer.isSucceed)
    const deviceGroups = useSelector(state => {
        const dataRaw = state.usergroupReducer.deviceGroups
        const data = dataRaw.map(d => <option name="devicegroupId" value={d.id}>{d.name}</option>)
        return data
    })
    const form = useSelector(state => state.usergroupReducer.addForm)

    const initializeHandler = useCallback( () => {
        dispatch(usergroupLoadDeviceGroups())
    }, [dispatch])

    const changeHandler = useCallback( (e) => {
        dispatch(usergroupSetForm(e.target.name, e.target.value))
    }, [dispatch])

    const createHandler = useCallback( (e) => {
        dispatch(usergroupAdd(form))
    }, [dispatch, form])

    useEffect( () => {initializeHandler()}, [initializeHandler])
    /*
    const [isSucceed, setSucceed] = useState(false)
    const [deviceGroups, setDeviceGroups] = useState(null)
    const [form, setForm] = useState({
        name: '',
        devicegroupId: 0
    })

    const initHandler = useCallback( async () => {
        const data = await request('/api/devicegroup', 'GET')
        const dataTransformed = data.map(d => <option name="devicegroupId" value={d.id}>{d.name}</option>)
        setDeviceGroups(dataTransformed)
    }, [request])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const createHandler = async () => {
        try {
            const resultCreation = await request("/api/usergroup/create", "POST", {name: form.name})

            if (resultCreation != null) {
                const resultSetDeviceGroup = await request('/api/usergroup/devicegroup', 'PUT', {...form})

            }
            message("Группа устройств успешно создана")
            setSucceed(true)
        } catch (e) {}
    }


    useEffect(() => {
        message(error)
        clearError()
        initHandler()
    }, [error, message, clearError, initHandler])
    */

    return (
        <div>
            <h1>Создание новой группы пользователей</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название группы</label>
                            <select defaultValue="0" className="col browser-default" name="devicegroupId" onChange={changeHandler}>
                                <option value="0" disabled>Выберите группу устройств</option>
                                {deviceGroups}
                            </select>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/usergroups" />}

        </div>
    )
}