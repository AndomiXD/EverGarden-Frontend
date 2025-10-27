import Client from './api'

export const RegisterUser = async (data) => {
    try{
      const payload = data
      const res = await Client.post('/auth/register', payload)
    return res.data
  }
    catch(error){
      const status = error?.response?.status
    const msg = error?.response?.data?.message || error?.response?.data || error.message
    console.error('Register failed:', status, msg)
    alert(`Registration failed: ${msg}`)
    return null
    }
  }

export const SignInUser = async (data) => {
  try{
    const res = await Client.post('/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user}
    catch(error){
      console.error('Error logging in:', error)
      alert('Login failed! Please check your email or password.')
    }
  }

export const CheckSession = async () => {
    try{
      const res = await Client.get('/auth/session')
    return res.data}
    catch(error){
      console.warn('Session check failed - user not logged in.')
     return null
    }
  }
