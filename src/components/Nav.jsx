import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  const username = user?.username
  const image = user?.image

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
          <Link to="/profile">Profile</Link>
          <Link to="/feed">Feed</Link>
          <Link to="/my-shares">My Shares</Link>
        </div>

        <div className="nav-logout">
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
