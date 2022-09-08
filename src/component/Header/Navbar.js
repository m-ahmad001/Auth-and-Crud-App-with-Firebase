import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link to='/' className="navbar-brand" >WebSoft</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to='/' className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to='/signup' className="nav-link" >Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to='/signin' className="nav-link " >Sign In</Link>
        </li>
        <li className="nav-item">
          <Link to='/AddEmployee' className="nav-link " >Add Employee</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
   </>
  )
}
