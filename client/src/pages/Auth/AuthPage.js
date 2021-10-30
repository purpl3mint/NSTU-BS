import React, {useCallback, useContext} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"
import { authSetForm, authLogin } from "../../store/actionCreators/authActionCreator"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading} = useHttp()
    const dispatch = useDispatch()

    const form = useSelector(state => state.authReducer.form)

    const changeHandler = event => {
        dispatch(authSetForm(event.target.name, event.target.value))
    }

    const loginHandler = useCallback(() => {
        dispatch(authLogin(form, auth))
    }, [dispatch, form, auth])


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Система вещания НГТУ</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="username" name="username" value={form.username} type="text" onChange={changeHandler} />
                                    <label htmlFor="username">Имя пользователя</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="password" name="password" value={form.password} type="password" onChange={changeHandler} />
                                    <label htmlFor="password">Пароль</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>Войти</button>
                    </div>

                </div>
            </div>
        </div>
    )
}