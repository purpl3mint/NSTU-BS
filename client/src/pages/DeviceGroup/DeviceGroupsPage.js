import React, { useCallback, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHttp } from "../../hooks/http.hook"
import { useDispatch, useSelector} from 'react-redux'
import { DeviceGroupCard } from "./DeviceGroupCard"
import { deviceGroupLoad, deviceGroupSetSucceed } from "../../store/actionCreators/deviceGroupActionCreator"

export const DeviceGroupsPage = () => {
    const {loading} = useHttp()
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

    const loadHandler = useCallback(() => {
        dispatch(deviceGroupSetSucceed(false))
        dispatch(deviceGroupLoad())
    }, [dispatch])

    useEffect(() => {loadHandler()}, [loadHandler])
    

    return (
        <div>
            <h1>Группы устройств</h1>
            <NavLink key="new" to="/devicegroup/add" className="waves-effect waves-light btn">Добавить</NavLink>
            <div className="collection" style={{border: "0px"}}>
                { loading && <div key="devgroup_loader" className="progress"><div className="indeterminate"></div></div> }
                { deviceGroups }
            </div>
        </div>
    )
}