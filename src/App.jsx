import { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Garden from "./pages/Garden"
import Profile from "./pages/Profile"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate("/") // go back to home when logged out
  }

  useEffect(() => {
    const checkToken = async () => {
      const userData = await CheckSession()
      setUser(userData)
    }

    const token = localStorage.getItem("token")
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/garden" element={<Garden user={user} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
