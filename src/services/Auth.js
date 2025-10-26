import Client from './api'

export const RegisterUser = async (data) => {
    try { const res = await Client.post('/auth/register', data)
    return res.data}catch(error){
      console.error('Error registering user:', error)
      alert('Registration failed! Please try again.')
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
    // Checks if there is a token and if it is valid
    return res.data}
    catch(error){
      console.warn('Session check failed - user not logged in.')
     return null
    }
  }
