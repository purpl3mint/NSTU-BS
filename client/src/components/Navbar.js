import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    
    return (
        <nav className="nav-extended">
            <div className="nav-wrapper blue-grey darken-1" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                <NavLink to="/" className="brand-logo">NSTU-BS</NavLink>

                <a href="/" data-target="mobile-demo" className="sidenav-trigger right">
                    <i className="material-icons">logout</i>
                </a>
                
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/cabinet">Личный кабинет</NavLink></li>
                    <li>
                        <a href="/" onClick={logoutHandler} style={{display:"flex"}}>
                            <i className="material-icons" style={{marginRight: "10px"}}>logout</i>
                            <span>Выход</span>
                        </a>
                    </li>
                </ul>

            </div>
        </nav>
    )
    
    
}