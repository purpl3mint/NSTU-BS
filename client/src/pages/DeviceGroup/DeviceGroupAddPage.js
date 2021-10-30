import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { useMessage } from "../../hooks/message.hook"
import { deviceGroupAdd, deviceGroupSetForm} from "../../store/actionCreators/deviceGroupActionCreator"

export const DeviceGroupAddPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()
    
    const form = useSelector (store => store.deviceGroupReducer.form)
    const isSucceed = useSelector (store => store.deviceGroupReducer.isSucceed)


    const changeHandler = event => {
        dispatch(deviceGroupSetForm(event.target.name, event.target.value));
    }

    const createHandler = async () => {
        if (!form.name) {
            message("Ошибка: не задано имя группы")
            return
        }

        dispatch(deviceGroupAdd(form))
    }

    return (
        <div>
            <h1>Создание новой группы устройств</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" value={form.name} type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="name">Название группы</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="link" name="link" value={form.link} type="text" onChange={changeHandler} />
                            <label htmlFor="link">Ссылка на группу(необязательно)</label>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/devicegroups" />}

        </div>
    )
}