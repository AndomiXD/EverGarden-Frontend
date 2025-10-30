import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadPreferences } from "../services/UserPrefs"

const Nav = ({ user, handleLogOut }) => {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const prefs = loadPreferences()
    setProfile(prefs)
  }, [user])

  const username = profile.username || user?.username
  const image = profile.image || user?.image

  let userOptions

  if (user) {
    userOptions = (
      <>
        <div className="nav-user-info">
          <img src={image} alt="User image" className="nav-avatar" />
          <span className="nav-welcome">Welcome, {username}!</span>
        </div>

        <div className="nav-links">
          <Link to="/garden">My Garden</Link>

          <Link to="/feed">Feed</Link>
          <Link to="/my-shares">My Shares</Link>
        </div>

        <div className="nav-logout">
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </div>
      </>
    )
  }

  const publicOptions = (
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Link to="/feed">Feed</Link>
    </div>
  )

  return (
    <header className="navbar">
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
