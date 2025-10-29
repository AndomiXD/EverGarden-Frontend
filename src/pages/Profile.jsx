import { useEffect, useState } from "react"
import { GetMyProfile, UpdateMyProfile, UpdateMyPassword } from "../services/UserServices"
import { savePreferences } from "../services/UserPrefs"   
const Profile = () => {
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [profileMessage, setProfileMessage] = useState("")
  const [profileError, setProfileError] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoadingProfile(true)
      const me = await GetMyProfile()
      if (me) {
        setUsername(me.username || "")
        setEmail(me.email || "")
        setAvatarUrl(me.avatarUrl || "")
      } else {
        setProfileError("Could not load your profile.")
      }
      setLoadingProfile(false)
    }
    load()
  }, [])

  const clearProfileMessages = () => {
    setProfileMessage("")
    setProfileError("")
  }

  const clearPasswordMessages = () => {
    setPasswordMessage("")
    setPasswordError("")
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault()
    clearProfileMessages()

    const updated = await UpdateMyProfile({ username, avatarUrl })
    if (updated) {
      setProfileMessage("Profile saved.")

      savePreferences({ displayName: username, avatarUrl })
    } else {
      setProfileError("Could not save your profile.")
    }
  }

  const handleChangePassword = async (event) => {
    event.preventDefault()
    clearPasswordMessages()

    if (!currentPassword || !newPassword) {
      setPasswordError("Please fill both fields.")
      return
    }

    setSavingPassword(true)
    const result = await UpdateMyPassword(currentPassword, newPassword)
    setSavingPassword(false)

    if (result) {
      setPasswordMessage("Password updated successfully.")
      setCurrentPassword("")
      setNewPassword("")
    } else {
      setPasswordError("Could not update your password. Please check your current password.")
    }
  }

  if (loadingProfile) {
    return <p className="profile-loading-text">Loading profile...</p>
  }

  return (
    <section className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      {profileMessage && <div className="notice notice-success">{profileMessage}</div>}
      {profileError && <div className="notice notice-error">{profileError}</div>}

      <div className="profile-sections">
        <div className="profile-section profile-info-section">
          <h3 className="section-title">Profile Information</h3>

          <div className="avatar-block">
            <div className="avatar-frame">
              {avatarUrl ? (
                <img
                  className="avatar-image"
                  src={avatarUrl}
                  alt="Avatar"
                  onError={(e) => {
                    e.currentTarget.src = ""
                    setProfileError("Could not load avatar from the provided link.")
                  }}
                />
              ) : (
                <div className="avatar-placeholder">No photo</div>
              )}
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSaveProfile}>
            <label className="form-label">
              Display Name
              <input
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your display name"
              />
            </label>

            <label className="form-label">
              Avatar Image Link (URL)
              <input
                className="form-input"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Paste a public image URL (PNG/JPG/WEBP)"
              />
            </label>

            <label className="form-label">
              Email (read only)
              <input className="form-input" value={email} readOnly disabled />
            </label>

            <button className="btn btn-primary" type="submit">
              Save Profile
            </button>
          </form>
        </div>

        <div className="profile-section password-section">
          <h3 className="section-title">Change Password</h3>

          {passwordMessage && <div className="notice notice-success">{passwordMessage}</div>}
          {passwordError && <div className="notice notice-error">{passwordError}</div>}

          <form className="password-form" onSubmit={handleChangePassword}>
            <label className="form-label">
              Current Password
              <input
                className="form-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </label>

            <label className="form-label">
              New Password
              <input
                className="form-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </label>

            <button className="btn btn-primary" type="submit" disabled={savingPassword}>
              {savingPassword ? "Saving..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile
