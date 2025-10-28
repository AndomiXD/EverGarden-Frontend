import Client from './api'

export const CreateShare = async (title, description) => {
  try {
    const res = await Client.post('/shares/create', { title, description })
    return res.data
  } catch (error) {
    alert('Error while sharing your garden')
    console.log(error)
  }
}

export const GetAllShares = async () => {
  try {
    const res = await Client.get('/shares/all')
    return res.data
  } catch (error) {
    alert('Error loading shared gardens')
    console.log(error)
    return []
  }
}
