import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useDispatch, useSelector} from 'react-redux'
import { DeviceGroupCard } from "./DeviceGroupCard"
import { Preloader } from "../../components/Preloader"
import { deviceGroupLoad, deviceGroupSetSucceed } from "../../store/actionCreators/deviceGroupActionCreator"

export const DeviceGroupsPage = () => {
    //const {loading} = useHttp()
    const dispatch = useDispatch()

    const deviceGroups = useSelector(state => {
        const groups = state.deviceGroupReducer.deviceGroups
        const transformedGroups = groups.map(g => 
            <DeviceGroupCard 
                key={g.id} 
                name={g.name} 
                id={g.id} 
                outerLink={g.outer_link} 
            />)
        return transformedGroups
    })
    const loading = useSelector(state => state.deviceGroupReducer.preloader)

    const loadHandler = useCallback(() => {
        dispatch(deviceGroupSetSucceed(false))
        dispatch(deviceGroupLoad())
    }, [dispatch])

    useEffect(() => {loadHandler()}, [loadHandler])
    

    return (
        <div>
            <h1>Группы устройств</h1>
            { loading && <Preloader />}
            { !loading && <div>
                <NavLink key="new" to="/devicegroup/add" className="waves-effect waves-light btn">Добавить</NavLink>
                <div className="collection" style={{border: "0px"}}>
                    { !loading && deviceGroups }
                </div>
            </div>
            }
        </div>
    )
}