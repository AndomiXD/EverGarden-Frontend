import Client from './api'
export const GetGarden = async () => {
  try{
    const res = await Client.get('./gardens/me')
    return res.data
  }catch(error){
    console.error('Error fetching garden:', error)
    alert('Could not load garden data.')
  }
}
export const GetSeeds = async () => {
  try{
    const res = await Client.get('/plants')
    return res.data
  }catch (error){
    console.error('Error fetching seeds:', error)
    alert('Could not load available seeds.')
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
