import React, { useCallback, useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { cabinetSetData } from "../../store/actionCreators/cabinetActionCreator"

export const CabinetPage = () => {
    const dispatch = useDispatch()

    const username = useSelector(state => state.cabinetReducer.username)
    const levelName = useSelector(state => state.cabinetReducer.levelName)

    const loadHandler = useCallback(() => {
        dispatch(cabinetSetData(JSON.parse(localStorage.getItem('userData')).token))
    }, [dispatch])

    useEffect(() => {
        loadHandler()
    }, [loadHandler])


    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                <span className="cabinet-page__username">Имя пользователя: {username}</span><br />
                <span className="cabinet-page__group">Тип пользователя: {levelName}</span>
            </div>
        </div>
    )
}