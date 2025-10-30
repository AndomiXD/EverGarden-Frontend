import Client from "./api"
export const GetMyProfile = async () => {
  try {
    const res = await Client.get("/users/me")
    return res.data
  } catch (error) {
    console.error("Error fetching user profile:", error)
  }
}

export const UpdateMyProfile = async ({ username, image }) => {
  try {
    const body = {}
    if (username) body.username = username
    if (image) body.image = image
    const res = await Client.put("/users/me", body)
    return res.data
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error?.response?.data || error
    )
    return null
  }
}

export const UpdateMyPassword = async (oldPassword, newPassword) => {
  try {
    const res = await Client.put("/auth/update", { oldPassword, newPassword })
    return res.data
  } catch (e) {
    console.error("UpdateMyPassword error:", e?.response?.data || e.message)
  }
}
