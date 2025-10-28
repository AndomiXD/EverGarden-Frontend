import Client from './api'
export const GetGarden = async () => {
  try {
    const res = await Client.get('/gardens/me')
    return res.data
  } catch (error) {
    const status = error?.response?.status
    const body = error?.response?.data
    console.error('GetGarden failed:', status, body)
    if (status === 404) {
      try {
        const created = await Client.post('/gardens')
        return created.data
      } catch (e) {
        console.error('Create garden failed:', e?.response?.status, e?.response?.data)
      }
    }
    alert('Could not load garden data.')
    return null
  }
}
export const GetSeeds = async () => {
  try{
    const res = await Client.get('/plants')
    return res.data
  }catch (error){
  console.error('GetSeeds failed:', error?.response?.status, error?.response?.data || error.message)
    alert('Could not load available seeds.')
    return []
  }
}
export const PlantSeed = async (SeedId, slotIndex) => {
  try{
const body = { seedId }
if (typeof slotIndex === 'number') body.slotIndex = slotIndex
const res= await Client.post('/gardens/plant', body)
return res.data
  } catch(error){
console.error('Error planting seed:', error)
alert('Failed to plant seed.')
  }
}
export const HarvestPlant = async (Index) => {
  try{
const res = await Client.post('/gardens/harvest', {index})
return res.data
  } catch(error){
console.error('Error harvesting plant:', error)
alert('Failed to harvest plant.')
  }
}
