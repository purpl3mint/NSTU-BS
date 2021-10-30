import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { UserGroupCard } from "./UserGroupCard"
import { useDispatch, useSelector } from "react-redux"
import { usergroupLoadGroups, usergroupSetSucceed } from "../../store/actionCreators/usergroupActionCreator"

export const UserGroupsPage = () => {
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const userGroups = useSelector(state => {
        const dataRaw = state.usergroupReducer.userGroups
        const data = dataRaw.map(g => <UserGroupCard key={g.id} name={g.name} id={g.id}/>)
        return data
    })

    const initializeHandler = useCallback( () => {
        dispatch(usergroupSetSucceed(false))
        dispatch(usergroupLoadGroups())
    }, [dispatch])

    useEffect( () => {initializeHandler()}, [initializeHandler])

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