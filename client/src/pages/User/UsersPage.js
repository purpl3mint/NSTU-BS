import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { UserCard } from "./UserCard"
import { useDispatch, useSelector } from "react-redux"
import { userLoadUsers, userSetSucceed } from "../../store/actionCreators/userActionCreator"

export const UsersPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()
    const dispatch = useDispatch()
    
    const users = useSelector(state => {
        const usersRaw = state.userReducer.users
        console.log("users raw > ", usersRaw);
        //if (usersRaw && usersRaw[0]) console.log("user group > ", usersRaw[0].usergroup);
        const users = usersRaw.map(u => {
            let result
            (u.usergroup && u.usergroup.name)
            ?   result = <UserCard key={u.id} username={u.username} id={u.id} level={u.level} usergroup={u.usergroup.name}/>
            :   result = <UserCard key={u.id} username={u.username} id={u.id} level={u.level} usergroup={"Неизвестно"}/>

            return result
        })
        return users
    })

    
    const initializeHandler = useCallback( () => {
        dispatch(userLoadUsers())
        dispatch(userSetSucceed(false))
    }, [dispatch])

    useEffect(() => { initializeHandler() }, [initializeHandler])
    
    /*
    const deleteHandler = useCallback( async event => {
        try {
            const data = await request("/api/user/" + event.target.name, "DELETE")
            message("Пользователь успешно удален")
            const deviceGroupUpd = await request("/api/user", "GET")
            const newDeviceGroupUpd = deviceGroupUpd.map(u => <UserCard key={u.id} username={u.username} id={u.id} level={u.level} deleteHandler={deleteHandler}/>)
            setUsers(newDeviceGroupUpd)
        } catch (e) {}
    }, [message, request, setUsers])

    const loadHandler = useCallback ( async () => {
        try {
            const data = await request("/api/user", "GET")
            console.log(data);
            const newData = data.map(u => (u.usergroup && u.usergroup.name) 
                ? <UserCard key={u.id} username={u.username} id={u.id} level={u.level} usergroup={u.usergroup.name} deleteHandler={deleteHandler}/>
                : <UserCard key={u.id} username={u.username} id={u.id} level={u.level} usergroup='не определена' deleteHandler={deleteHandler}/>
            )
            setUsers(newData)
        } catch (e) {}
    }, [request, setUsers, deleteHandler])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {loadHandler()}, [loadHandler])
    */

    return (
        <div className="row">
            <h1>Пользователи</h1>
            <NavLink key="new" to="/user/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div key="devgroup_loader" className="progress"><div className="indeterminate"></div></div> }
                { users }
            </div>

        </div>
    )
}