import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Instructors from '../Components/AdminPanel'
import Admin from '../Pages/Admin'
import Home from '../Pages/Home'
import Instructor from '../Pages/Instructor'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import PrivateRoute from './PrivateRoute'




export default function AllRoutes() {
  return (
    <Routes>
      <Route/>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/instructor" element={<PrivateRoute><Instructor/></PrivateRoute>} />
    </Routes>
  )
}