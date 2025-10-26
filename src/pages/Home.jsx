import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return(
    <section>
      <h1>EverGarden</h1>
      <p>Grow, harvest, and share your garden.</p>
      <div>
        <Link to="/signup">Create Account</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/garden">My Garden</Link>
      </div>
    </section>
  )
}

export default Home
