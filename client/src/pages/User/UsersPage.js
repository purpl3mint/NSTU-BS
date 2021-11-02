import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { UserCard } from "./UserCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { userLoadUsers, userSetSucceed } from "../../store/actionCreators/userActionCreator"

export const UsersPage = () => {
    const dispatch = useDispatch()
    
    const loading = useSelector(state => state.userReducer.preloader)
    const users = useSelector(state => {
        const usersRaw = state.userReducer.users
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
    
    return (
        <div className="row">
            <h1>Пользователи</h1>

            { loading && <Preloader />}

            { !loading && 
            <div>
                <NavLink key="new" to="/user/add" className="waves-effect waves-light btn">Добавить</NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { loading && <div key="devgroup_loader" className="progress"><div className="indeterminate"></div></div> }
                    { users }
                </div>
            </div>
            }

        </div>
    )
}