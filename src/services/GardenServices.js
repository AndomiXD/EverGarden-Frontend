import Client from "./api"

const unwrapGarden = (data) => (data?.garden ? data.garden : data)

export const GetGarden = async () => {
  try {
    const res = await Client.get("/gardens/me")
    return unwrapGarden(res.data)
  } catch (error) {
    if (error?.response?.status === 404) {
      const created = await Client.post("/gardens/create")
      return unwrapGarden(created.data)
    }
    console.error(
      "GetGarden failed:",
      error?.response?.status,
      error?.response?.data || error.message
    )
    alert("Could not load garden data.")
    return null
  }
}

export const GetSeeds = async () => {
  try {
    const res = await Client.get("/plants/all")
    return res.data
  } catch (error) {
    console.error(
      "GetSeeds failed:",
      error?.response?.status,
      error?.response?.data || error.message
    )
    return []
  }
}

export const PlantSeed = async (plantId, position) => {
  try {
    const res = await Client.post("/gardens/plant", { plantId, position })
    return res.data
  } catch (error) {
    console.error(
      "Error planting seed:",
      error?.response?.status,
      error?.response?.data || error.message
    )
    alert("Failed to plant seed.")
    return null
  }
}


export const RemovePlant = async (position) => {
  try {
    const res = await Client.delete("/gardens/remove", { data: { position } })
    return res.data
  } catch (error) {
    console.error(
      "Error removing plant:",
      error?.response?.status,
      error?.response?.data || error.message
    )
    alert("Failed to remove plant.")
    return null
  }
}


