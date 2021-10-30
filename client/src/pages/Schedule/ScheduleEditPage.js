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
        if (!form.timeStart__hour && !form.timeStart__min && !form.timeStart__sec &&
            !form.timeEnd__hour && !form.timeEnd__min && !form.timeEnd__sec) {
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
                        <div className="input-field col s6">
                            <span>Время начала</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input id="timeStart__hour" name="timeStart__hour" type="text" className="validate col s3" placeholder="ЧЧ" onChange={changeHandler}/>
                                <input id="timeStart__min" name="timeStart__min" type="text" className="validate col s3 offset-s1" placeholder="ММ" onChange={changeHandler}/>
                                <input id="timeStart__sec" name="timeStart__sec" type="text" className="validate col s3 offset-s1" placeholder="СС" onChange={changeHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <span>Время завершения</span>
                            <div className="row" style={{paddingLeft: "12px"}}>
                                <input id="timeEnd__hour" name="timeEnd__hour" type="text" className="validate col s3" placeholder="ЧЧ" onChange={changeHandler}/>
                                <input id="timeEnd__min" name="timeEnd__min" type="text" className="validate col s3 offset-s1" placeholder="ММ" onChange={changeHandler}/>
                                <input id="timeEnd__sec" name="timeEnd__sec" type="text" className="validate col s3 offset-s1" placeholder="СС" onChange={changeHandler}/>
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