import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyGarden from "./pages/MyGarden"
import ShareFeed from "./pages/ShareFeed"
import ViewGarden from "./pages/ViewGarden"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
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
          <Route path="/gardens" element={<MyGarden user={user} />} />
          <Route path="/feed" element={<ShareFeed />} />
          <Route path="/gardens/:id" element={<ViewGarden />} />
        </Routes>
      </main>
    </>
  )
}

export default App
