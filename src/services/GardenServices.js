import Client from "./api"


const unwrapGarden = (data) => (data?.garden ? data.garden : data)


export const GetGarden = async () => {
  try {
    const response = await Client.get("/gardens/me")
    return unwrapGarden(response.data)
  } catch (error) {

    if (error?.response?.status === 404) {
      const created = await Client.post("/gardens/create")
      return unwrapGarden(created.data)
    }
    console.error("GetGarden failed:", error)
    return null
  }
}


export const GetSeeds = async () => {
  try {
    const response = await Client.get("/plants/all")
    return response.data
  } catch (error) {
    console.error("GetSeeds failed:", error)
    return []
  }
}


export const PlantSeed = async (plantId, position) => {
  try {
    const response = await Client.post("/gardens/plant", { plantId, position })
    return response.data
  } catch (error) {
    console.error("PlantSeed failed:", error)
    return null
  }
}


export const HarvestPlant = async (position) => {
  try {
    const response = await Client.post("/gardens/harvest", { position })
    return response.data
  } catch (error) {
    console.error("HarvestPlant failed:", error)
    return null
  }
}


export const RemovePlant = async (position) => {
  try {
    const response = await Client.delete("/gardens/remove", { data: { position } })
    return response.data
  } catch (error) {
    console.error("RemovePlant failed:", error)
    return null
  }
}


export const GetGardenById = async (gardenId) => {
  try {
    const response = await Client.get(`/gardens/${gardenId}`)

    return response.data
  } catch (error) {
    console.error("GetGardenById failed:", error)
    return null
  }
}
