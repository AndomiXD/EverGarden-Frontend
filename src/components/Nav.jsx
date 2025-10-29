import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if(user){
    userOptions = (
      <>
      <h3>Welcome {user.name}!</h3>
      <Link to="/garden">My Garden</Link>
      <Link onClick={handleLogOut} to="/">
      Sign Out</Link>
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
      <nav>
        {user ? userOptions : publicOptions }
      </nav>
    </header>
  )
}

export default Nav
