import React, { useCallback, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { usergroupAdd, usergroupLoadDeviceGroups, usergroupSetForm } from "../../store/actionCreators/usergroupActionCreator"
import { useMessage } from "../../hooks/message.hook"

export const UserGroupAddPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.usergroupReducer.isSucceed)
    const deviceGroups = useSelector(state => {
        const dataRaw = state.usergroupReducer.deviceGroups
        const data = dataRaw.map(d => <option name="devicegroupId" key={d.id} value={d.id}>{d.name}</option>)
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
        if (!form.name) {
            message("Ошибка: не задано название группы")
            return
        }
        if (!form.deviceGroups) {
            message("Ошибка: не задана группа устройств")
            return
        }
        dispatch(usergroupAdd(form))
    }, [dispatch, message, form])

    useEffect( () => {initializeHandler()}, [initializeHandler])

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