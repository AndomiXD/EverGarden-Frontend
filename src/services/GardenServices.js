import Client from "./api"
export const CreateGarden = async (name, description) => {
  try {
    const res = await Client.post("/gardens/create", { name, description })
    return res.data
  } catch (error) {
    console.error("Error creating garden:", error)
  }
}
export const GetGarden = async () => {
  try {
    const res = await Client.get("/gardens/me")
    return res.data
  } catch (error) {
    console.error("Error fetching garden:", error)
  }
}
export const GetSeeds = async () => {
  try {
    const res = await Client.get("/plants/all")
    return res.data
  } catch (error) {
    console.error("Error fetching seeds:", error)
  }
}
export const PlantSeed = async (plantId, position) => {
  try {
    const body = { plantId, position }
    const res = await Client.post("/gardens/plant", body)
    return res.data
  } catch (error) {
    console.error("Error planting seed:", error)
  }
}
export const HarvestPlant = async (position) => {
  try {
    const res = await Client.put("/gardens/harvest", { position })
    return res.data
  } catch (error) {
    console.error("Error harvesting plant:", error)
  }
}

export const RemoveSeed = async (position) => {
  try {
    const res = await Client.delete("/gardens/remove", { data: { position } })
    return res.data
  } catch (error) {
    console.error("Error removing seed:", error)
  }
}

export const UpdateTimeLeft = async () => {
  try {
    const res = await Client.put("/gardens/update-time")
    return res.data
  } catch (error) {
    console.error("Error updating time left:", error)
  }
}

export const ShareGarden = async (title, description) => {
  try {
    const res = await Client.post("/shares/create", { title, description })
    return res.data
  } catch (error) {
    console.error("Error sharing garden:", error)
  }
}

export const GetAllShares = async () => {
  try {
    const res = await Client.get("/shares/all")
    return res.data
  } catch (error) {
    console.error("Error fetching shares:", error)
  }
}

export const GetUserShares = async () => {
  try {
    const res = await Client.get("/shares/user")
    return res.data
  } catch (error) {
    console.error("Error fetching user shares:", error)
  }
}

export const UpdateShare = async (id, title, description) => {
  try {
    const res = await Client.put(`/shares/${id}`, { title, description })
    return res.data
  } catch (error) {
    console.error("Error updating share:", error)
  }
}

export const DeleteShare = async (id) => {
  try {
    const res = await Client.delete(`/shares/${id}`)
    return res.data
  } catch (error) {
    console.error("Error deleting share:", error)
  }
}

export const GetGardenById = async (id) => {
  try {
    const res = await Client.get(`/gardens/${id}`)
    return res.data
  } catch (error) {
    console.error("Error fetching garden by ID:", error)
  }
}

export const GetPublicGarden = async (userId) => {
  try {
    const res = await Client.get(`/gardens/share/${userId}`)
    return res.data
  } catch (error) {
    console.error("Error fetching public garden:", error)
  }
}

export const toggleAutoHarvest = async () => {
  try {
    const res = await Client.put("/gardens/toggle-autoHarvest")
    return res.data
  } catch (err) {
    console.error("Error toggling autoHarvest", err)
  }
}
