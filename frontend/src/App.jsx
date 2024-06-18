import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import LandingPage from './pages/home/LandingPage'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
