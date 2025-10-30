import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser, SignInUser } from "../services/Auth"

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await RegisterUser(form)
    if (!ok) return
    const user = await SignInUser({
      email: form.email,
      password: form.password,
    })
    if (user) {
      setUser(user)
      navigate("/garden")
    }
  }

  return (
    <section className="signup-page">
      <h2 className="signup-title">Create Your Account</h2>
      <p className="signup-subtitle">
        Join EverGarden and start growing today!
      </p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter a username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter a strong password"
          />
        </div>

        <button type="submit" className="btn btn-primary signup-btn">
          Create Account
        </button>
      </form>
    </section>
  )
}

export default Signup
