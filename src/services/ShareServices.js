import Client from "./api"


export const CreateShare = async (title, description) => {
  try {
    const response = await Client.post("/shares/create", { title, description })
    return response.data
  } catch {
    return null
  }
}


export const GetAllShares = async () => {
  try {
    const response = await Client.get("/shares/all")
    return response.data
  } catch {
    return []
  }
}


export const UpdateShare = async (shareId, data) => {
  try {
    const response = await Client.put(`/shares/${shareId}`, data)
    return response.data
  } catch {
    return null
  }
}

export const DeleteShare = async (shareId) => {
  try {
    const response = await Client.delete(`/shares/${shareId}`)
    return response.data
  } catch {
    return null
  }
}
