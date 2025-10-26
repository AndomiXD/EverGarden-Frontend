import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/Auth'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyGarden from './pages/MyGarden'

import './App.css'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(()=> {
    const checkToken = async () => {
      const userData = await CheckSession()
      setUser(userData)
    }
    const token = localStorage.getItem('token')
    if(token){
      checkToken()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/garden" element={<MyGarden user={user}/>} />
        </Routes>
      </main>
    </>
  )
}

export default App
