import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import {SignInUser} from "../services/Auth"

const Login = ({ setUser}) => {
  const [form, setForm] = useState({ email:"", password:""})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = await SignInUser(form)
    if (user) {
      setUser(user)
      navigate("/garden")
    }
  }
  return (
    <section>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange}/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange}/>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </section>
  )
}

export default Login
