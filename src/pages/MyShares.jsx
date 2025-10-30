import { useEffect, useState } from "react"
import { CheckSession } from "../services/Auth"
import {
  GetAllShares,
  CreateShare,
  UpdateShare,
  DeleteShare,
} from "../services/ShareServices"
import { useNavigate } from "react-router-dom"

const MyShares = () => {
  const [allShares, setAllShares] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [editingShareId, setEditingShareId] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", description: "" })
  const [newShare, setNewShare] = useState({ title: "", description: "" })
  const [notice, setNotice] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const me = await CheckSession()
      setCurrentUser(me || null)
      const shares = await GetAllShares()
      setAllShares(Array.isArray(shares) ? shares : [])
    }
    load()
  }, [])

  const myShares = currentUser
    ? allShares.filter(
        (share) =>
          (share?.poster?._id || share.poster) ===
          (currentUser?._id || currentUser?.id)
      )
    : []

  const handleNewShareChange = (e) => {
    const { name, value } = e.target
    setNewShare((prev) => ({ ...prev, [name]: value }))
  }

  const submitNewShare = async (e) => {
    e.preventDefault()
    if (!newShare.title.trim() || !newShare.description.trim()) {
      setNotice("Please fill in both title and description.")
      setTimeout(() => setNotice(""), 2500)
      return
    }

    const result = await CreateShare(newShare.title, newShare.description)
    if (result?.share) {
      setAllShares((prev) => [result.share, ...prev])
      setNotice("New share created successfully!")
      setNewShare({ title: "", description: "" })
    } else {
      setNotice("Failed to create share.")
    }
    setTimeout(() => setNotice(""), 2500)
  }

  const startEdit = (share) => {
    setEditingShareId(share._id)
    setEditForm({ title: share.title, description: share.description || "" })
  }

  const cancelEdit = () => {
    setEditingShareId(null)
    setEditForm({ title: "", description: "" })
  }

  const saveEdit = async () => {
    const result = await UpdateShare(editingShareId, editForm)
    if (result?.share) {
      setAllShares((prev) =>
        prev.map((s) => (s._id === result.share._id ? result.share : s))
      )
      setNotice("Share updated.")
    } else {
      setNotice("Could not update share.")
    }
    cancelEdit()
    setTimeout(() => setNotice(""), 2500)
  }

  const removeShare = async (shareId) => {
    const result = await DeleteShare(shareId)
    if (result?.success) {
      setAllShares((prev) => prev.filter((s) => s._id !== shareId))
      setNotice("Share deleted.")
    } else {
      setNotice("Could not delete share.")
    }
    setTimeout(() => setNotice(""), 2500)
  }

  const viewGarden = (share) => {
    const gardenId =
      typeof share.garden === "object" ? share.garden?._id : share.garden
    if (gardenId) navigate(`/gardens/${gardenId}`)
  }

  return (
    <section className="my-shares-page">
      <h2 className="page-title">My Shared Gardens</h2>

      {notice && <div className="notice notice-info">{notice}</div>}

      {!currentUser ? (
        <p>Please sign in to see and create your shared gardens.</p>
      ) : (
        <>
          <form className="new-share-form" onSubmit={submitNewShare}>
            <h3>Create a New Share</h3>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Title"
              value={newShare.title}
              onChange={handleNewShareChange}
            />
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Description"
              value={newShare.description}
              onChange={handleNewShareChange}
            />
            <button className="btn btn-primary" type="submit">
              Share Garden
            </button>
          </form>

          {myShares.length === 0 ? (
            <p>You have not shared any gardens yet.</p>
          ) : (
            myShares.map((share) => (
              <div key={share._id} className="share-card">
                {editingShareId === share._id ? (
                  <div className="share-edit-form">
                    <input
                      className="form-input"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="Title"
                    />
                    <textarea
                      className="form-textarea"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((f) => ({
                          ...f,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Description"
                    />
                    <div className="share-actions">
                      <button className="btn btn-primary" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="btn" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="share-title">{share.title}</h3>
                    <p className="share-description">{share.description}</p>
                    <p className="share-meta">
                      By <strong>{share?.poster?.username}</strong>
                    </p>
                    <div className="share-actions">
                      <button className="btn" onClick={() => viewGarden(share)}>
                        View Garden
                      </button>
                      <button className="btn" onClick={() => startEdit(share)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeShare(share._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </>
      )}
    </section>
  )
}

export default MyShares
