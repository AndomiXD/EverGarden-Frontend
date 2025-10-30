import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <Link to="/garden">My Garden</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/my-shares">My Shares</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </>
  )

  return (
    <header>
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
