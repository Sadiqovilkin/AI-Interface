import React from 'react'
import "./SideBar.scss"
import siteLogo from '../../assets/logo/4simLogo.png'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <aside id='sideBar'>
        <div className="logo">
            <img src={siteLogo} alt="" />
        </div>
        <div className="navLinks">
            <ul>
                <li>
                    <NavLink to="/">ChatBot</NavLink>
                </li>
            </ul>
        </div>
    </aside>
  )
}

export default SideBar