import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { loadPreferences } from "../services/UserPrefs"

const Nav = ({ user, handleLogOut }) => {
  const [preferences, setPreferences] = useState({})

  useEffect(() => {
    setPreferences(loadPreferences())
  }, [user])

  const nameToShow = preferences.displayName || user?.username || "Guest"
  const avatarToShow = preferences.avatarUrl || ""

  let privateLinks
  if (user) {
    privateLinks = (
      <>
        <div className="nav-user">
          {avatarToShow ? <img className="nav-avatar" src={avatarToShow} alt="Avatar" /> : null}
          <h3 className="nav-welcome">Welcome {nameToShow}!</h3>
        </div>
        <Link to="/gardens">My Garden</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/my-shares">My Shares</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/" onClick={handleLogOut}>Sign Out</Link>
      </>
    )
  }

  const publicLinks = (
    <>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Link to="/feed">Feed</Link>
    </>
  )

  return (
    <header className="site-header">
      <nav className="site-nav">
        {user ? privateLinks : publicLinks}
      </nav>
    </header>
  )
}

export default Nav
