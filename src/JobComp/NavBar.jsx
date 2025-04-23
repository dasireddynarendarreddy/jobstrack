import React from 'react'
import { NavLink } from 'react-router-dom'
function NavBar() {
  return (
    <div>
      <NavLink  to="/">Register</NavLink>
      <NavLink to="/home">Jobs</NavLink>
    </div>
  )
}

export default NavBar
