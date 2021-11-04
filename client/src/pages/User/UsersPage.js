import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { UserCard } from "./UserCard"
import { Preloader } from '../../components/Preloader'
import { useDispatch, useSelector } from "react-redux"
import { userLoadUsers, userSetSucceed } from "../../store/actionCreators/userActionCreator"
import { Pagination } from "../../components/Pagination"

export const UsersPage = () => {
    const dispatch = useDispatch()
    const [activePage, setActivePage] = useState(1)
    const [minValue, setMinValue] = useState(1)
    //const [maxValue, setMaxValue] = useState(5)
    const [isFirst, setisFirst] = useState(true)
    const [isLast, setIsLast] = useState(false)
    const [totalPages, setTotalPages] = useState(5)
    
    
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


    const paginationClickHandler = useCallback( (newValue) => {
        setActivePage(newValue)
        newValue === '1' ? setisFirst(true) : setisFirst(false)
        newValue === totalPages+'' ? setIsLast(true) : setIsLast(false)


        console.log("click");
    }, [setActivePage, totalPages])

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
                <NavLink key="new" to="/user/add" className="waves-effect waves-light btn" style={{display: "flex", width: '130px'}}>
                    <i className="material-icons">add</i>
                    <span>Добавить</span>
                </NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { loading && <div key="devgroup_loader" className="progress"><div className="indeterminate"></div></div> }
                    { users }
                </div>
                <Pagination 
                    active={activePage}
                    minValue={minValue}
                    maxValue={totalPages}
                    isFirst={isFirst}
                    isLast={isLast}
                    changeHandler={paginationClickHandler}
                />
            </div>
            }

        </div>
    )
}