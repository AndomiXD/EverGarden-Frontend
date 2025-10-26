import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterUser, SignInUser} from "../services/Auth"

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({ username:"", email:"", password:""})
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await RegisterUser(form)
    if(!ok)return
    const user = await SignInUser({ email: form.email, password: form.password })
    if(user){
      setUser(user)
      navigate("/garden")
    }
  }

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </section>
  )
}

export default Signup
