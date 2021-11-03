import React, { useCallback, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { 
    schedulesSetIsSucceed,
    schedulesSetUpdateForm,
    schedulesUpdate
} from "../../store/actionCreators/scheduleActionCreator"

export const ScheduleEditPage = () => {
    const dispatch = useDispatch()

    const form = useSelector(state => state.scheduleReducer.updateForm)
    const isSucceed = useSelector(state => state.scheduleReducer.isSucceed)
    const id = useSelector(state => state.scheduleReducer.currentScheduleId)

    const initializeHandler = useCallback( () => {
        dispatch(schedulesSetIsSucceed(false))
    }, [dispatch])

    const changeHandler = useCallback((e) => {
        dispatch(schedulesSetUpdateForm(e.target.name, e.target.value))
    }, [dispatch])

    const saveHandler = useCallback(() => {
        if (!form.time_start && !form.time_end) {
            dispatch(schedulesSetIsSucceed(true))
            return
        }
        
        dispatch(schedulesUpdate(form, id))
    }, [dispatch, form, id])

    useEffect(() => { initializeHandler() }, [initializeHandler])

    return (
        <div>
            <h1>Изменение расписания</h1>

            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s3">
                            <span>Время начала</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input type="time" id="time_start" name="time_start" onChange={changeHandler}></input>
                            </div>
                        </div>
                        <div className="input-field col s3 offset-s1">
                            <span>Время завершения</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input type="time" id="time_end" name="time_end" onChange={changeHandler}></input>
                            </div>
                        </div>
                    </div>
                    <button className="btn blue-grey darken-1" onClick={saveHandler}>Сохранить</button>
                </div>
            </div>

            {isSucceed && <Redirect to="/schedules" />}

        </div>
    )
}