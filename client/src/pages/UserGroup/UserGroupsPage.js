import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { UserGroupCard } from "./UserGroupCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { usergroupLoadGroups, usergroupSetSucceed } from "../../store/actionCreators/usergroupActionCreator"

export const UserGroupsPage = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.usergroupReducer.preloader)
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

            { loading && <Preloader />}

            { !loading && 
            <div>
                <NavLink key="new" to="/usergroup/add" className="waves-effect waves-light btn" style={{display: "flex", width: '130px'}}>
                    <i className="material-icons">add</i>
                    <span>Добавить</span>
                </NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { userGroups }
                </div>
            </div>
            }
        </div>
    )
}