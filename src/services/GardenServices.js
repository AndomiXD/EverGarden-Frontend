import Client from './api'

export const GetGarden = async () => {
  try {
    const res = await Client.get('/gardens/me')
    return res.data
  } catch (error) {
    const status = error?.response?.status
    if (status === 404) {
      try {
        const created = await Client.post('/gardens/create')
        return created.data.garden || created.data
      } catch (e) {
        console.error('Create garden failed:', e?.response?.status, e?.response?.data)
      }
    }
    console.error('GetGarden failed:', status, error?.response?.data || error.message)
    alert('Could not load garden data.')
    return null
  }
}

export const GetSeeds = async () => {
  try {
    const res = await Client.get('/plants/all')
    return res.data
  } catch (error) {
    console.error('GetSeeds failed:', error?.response?.status, error?.response?.data || error.message)
    alert('Could not load available seeds.')
    return []
  }
}

export const PlantSeed = async (seedId, slotIndex) => {
  try {
    const body = { seedId }
    if (typeof slotIndex === 'number') body.slotIndex = slotIndex
    const res = await Client.post('/gardens/plant', body)
    return res.data
  } catch (error) {
    console.error('Error planting seed:', error?.response?.status, error?.response?.data || error.message)
    alert('Failed to plant seed.')
    return null
  }
}

export const HarvestPlant = async (index) => {
  try {
    const res = await Client.post('/gardens/remove', { index })
    return res.data
  } catch (error) {
    console.error('Error harvesting (remove) plant:', error?.response?.status, error?.response?.data || error.message)
    alert('Failed to harvest/remove plant.')
    return null
  }
}
