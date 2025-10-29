import Client from "./api"

// If the server wraps the garden like { garden: {...} }, take garden.
// Otherwise, just return the data itself.
const unwrapGarden = (data) => (data?.garden ? data.garden : data)

/**
 * Get the current signed-in user's garden.
 * If the server says "not found" (404), create a new garden, then return it.
 */
export const GetGarden = async () => {
  try {
    const response = await Client.get("/gardens/me")
    return unwrapGarden(response.data)
  } catch (error) {
    // If no garden exists yet, create one automatically.
    if (error?.response?.status === 404) {
      const created = await Client.post("/gardens/create")
      return unwrapGarden(created.data)
    }
    console.error("GetGarden failed:", error)
    return null
  }
}

/**
 * Get all available seeds (plants you can buy).
 */
export const GetSeeds = async () => {
  try {
    const response = await Client.get("/plants/all")
    return response.data
  } catch (error) {
    console.error("GetSeeds failed:", error)
    return []
  }
}

/**
 * Plant one seed in a position (example: position 0).
 * Returns the updated garden and (usually) the new balance.
 */
export const PlantSeed = async (plantId, position) => {
  try {
    const response = await Client.post("/gardens/plant", { plantId, position })
    return response.data
  } catch (error) {
    console.error("PlantSeed failed:", error)
    return null
  }
}

/**
 * Harvest a plant from a position (when it is ready).
 * Returns the updated garden, reward, and balance (if your backend sends them).
 */
export const HarvestPlant = async (position) => {
  try {
    const response = await Client.post("/gardens/harvest", { position })
    return response.data
  } catch (error) {
    console.error("HarvestPlant failed:", error)
    return null
  }
}

/**
 * Remove a plant from a position (for example, to clear the tile).
 */
export const RemovePlant = async (position) => {
  try {
    const response = await Client.delete("/gardens/remove", { data: { position } })
    return response.data
  } catch (error) {
    console.error("RemovePlant failed:", error)
    return null
  }
}

/**
 * ✅ NEW: Get a garden by its ID (used when you click "View Garden" in the feed).
 * Example URL it calls on your server: GET /gardens/6578abcd1234...
 */
export const GetGardenById = async (gardenId) => {
  try {
    const response = await Client.get(`/gardens/${gardenId}`)
    // For this route your backend returns the garden object directly.
    return response.data
  } catch (error) {
    console.error("GetGardenById failed:", error)
    return null
  }
}
