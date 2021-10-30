import React, { useCallback, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLoadGroup, userSetGroup, userSetGroupsForm } from "../../store/actionCreators/userActionCreator"
import { useMessage } from "../../hooks/message.hook"

export const UserSetGroupPage = () => {
    const message = useMessage()
    const dispatch = useDispatch()

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
        if (!form.group_id){
            message("Ошибка: не задана группа пользователей")
            return
        }
        dispatch(userSetGroup(form, id))
    }, [dispatch, message, form, id])

    useEffect( () => { initializeHandler() }, [initializeHandler])

    return (
        <div>
            <h1>Изменение группы пользователя</h1>

            <div className="row">
                <div className="col s12">
                    <span>Имя пользователя: {username}</span>
                    {   level === 1 &&
                        <div className="row">
                            <select defaultValue="" className="col s6 browser-default" name="group_id" onChange={changeHandler}>
                                <option value="" disabled>Выберите группу пользователей</option>
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