import { Link } from "react-router-dom"

const Home = () => {
  return (
    <section className="home-page">
      <h1 className="home-title">EverGarden</h1>
      <p className="home-subtitle">Grow, harvest, and share your garden.</p>

      <div className="home-buttons">
        <Link to="/signup" className="btn btn-primary">
          Create Account
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Sign In
        </Link>
      </div>
    </section>
  )
}

export default Home
