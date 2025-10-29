import Client from "./api"

export const GetMyProfile = async () => {
  try {
    const res = await Client.get("/users/me")
    return res.data
  } catch (e) {
    console.error("GetMyProfile error:", e?.response?.data || e.message)
    return null
  }
}

export const UpdateMyProfile = async (data) => {
  try {
    const res = await Client.put("/users/me", data)
    return res.data
  } catch (e) {
    console.error("UpdateMyProfile error:", e?.response?.data || e.message)
    return null
  }
}

export const UpdateMyPassword = async (oldPassword, newPassword) => {
  try {
    const res = await Client.put("/users/password", { oldPassword, newPassword })
    return res.data
  } catch (e) {
    console.error("UpdateMyPassword error:", e?.response?.data || e.message)
    return null
  }
}
