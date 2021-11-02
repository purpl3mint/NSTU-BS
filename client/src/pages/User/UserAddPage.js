import React, { useCallback } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userSetAddForm, userAdd } from "../../store/actionCreators/userActionCreator"
import { useMessage } from "../../hooks/message.hook"

export const UserAddPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

    const isSucceed = useSelector(state => state.userReducer.isSucceed)
    const form = useSelector(state => state.userReducer.addForm)

    const changeHandler = useCallback( (e) => {
        dispatch(userSetAddForm(e.target.name, e.target.value))
    }, [dispatch])

    const createHandler = useCallback( () => {
        if (!form.username){
            message("Ошибка: не задано имя пользователя")
            return
        }
        if (!form.password){
            message("Ошибка: не задан пароль")
            return
        }

        dispatch(userAdd(form))
    }, [dispatch, message, form])

    return (
        <div>
            <h1>Создание нового пользователя</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="username" name="username" type="text" className="validate" onChange={changeHandler} />
                            <label htmlFor="username">Имя пользователя</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="password" name="password" type="text" onChange={changeHandler} />
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <select defaultValue="-1" className="col s6 browser-default" name="level" onChange={changeHandler}>
                            <option value="-1" disabled>Выберите уровень доступа</option>
                            <option value="0">Обычный пользователь</option>
                            <option value="1">Модератор</option>
                            <option value="2">Администратор</option>
                        </select>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/users" />}

        </div>
    )
}