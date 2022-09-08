import React from 'react'
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import Navbar from '../component/Header/Navbar'
import Home from './Home/Home'
import SignUp from '../pages/SignUp/SignUp'
import SignIn from '../pages/SignIn/SignIn'
import AddEmployee from './AddEmployee/AddEmployee'

export default function CustomRoutes() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/AddEmployee' element={<AddEmployee/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
