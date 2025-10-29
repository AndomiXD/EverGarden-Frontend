import { useEffect, useState } from "react"
import { CheckSession } from "../services/Auth"
import { loadPreferences, savePreferences } from "../services/UserPrefs"

const Profile = () => {
  const [signedInUser, setSignedInUser] = useState(null)
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const initialize = async () => {
      const userFromServer = await CheckSession()
      setSignedInUser(userFromServer || null)

      const prefs = loadPreferences()
      // Use local override if it exists, otherwise fall back to server user name
      setDisplayName(prefs.displayName || userFromServer?.username || "")
      setAvatarUrl(prefs.avatarUrl || "")
    }
    initialize()
  }, [])

  const handleSave = (event) => {
    event.preventDefault()
    savePreferences({ displayName, avatarUrl })
    setMessage("Profile saved locally. (Frontend only)")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <section className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      {message && <div className="notice notice-success">{message}</div>}

      <div className="profile-layout">
        <div className="profile-avatar">
          {/* If you have an avatar URL, show it with CSS background-image or <img> via CSS */}
          {avatarUrl ? (
            <img className="avatar-image" src={avatarUrl} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">No photo</div>
          )}
          <p className="avatar-help">
            Paste any public image link below (for example from ImgBB or Cloudinary).
          </p>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <label className="form-label">
            Display Name (local override)
            <input
              className="form-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={signedInUser?.username || "Your name"}
            />
          </label>

          <label className="form-label">
            Avatar Image URL
            <input
              className="form-input"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/your-photo.png"
            />
          </label>

          <button className="btn btn-primary" type="submit">
            Save (Local)
          </button>
        </form>
      </div>
    </section>
  )
}

export default Profile
