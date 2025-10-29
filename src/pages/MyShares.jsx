import { useEffect, useMemo, useState } from "react"
import { CheckSession } from "../services/Auth"
import { GetAllShares, UpdateShare, DeleteShare } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"

const MyShares = () => {
  const [allShares, setAllShares] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [editingShareId, setEditingShareId] = useState(null)
  const [editForm, setEditForm] = useState({ title: "", description: "" })
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

  const myShares = useMemo(() => {
    if (!currentUser) return []
    const myId = currentUser?._id || currentUser?.id
    return allShares.filter((share) => (share?.poster?._id || share.poster) === myId)
  }, [allShares, currentUser])

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
      setAllShares((prev) => prev.map((s) => (s._id === result.share._id ? result.share : s)))
      setNotice("Share updated.")
    } else {
      setNotice("Editing requires backend support. (User interface only here.)")
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
      setNotice("Deleting requires backend support. (User interface only here.)")
    }
    setTimeout(() => setNotice(""), 2500)
  }

  const viewGarden = (share) => {
    const gardenId = typeof share.garden === "object" ? share.garden?._id : share.garden
    if (gardenId) navigate(`/gardens/${gardenId}`)
  }

  return (
    <section className="my-shares-page">
      <h2 className="page-title">My Shared Gardens</h2>

      {notice && <div className="notice notice-info">{notice}</div>}

      {!currentUser ? (
        <p>Please sign in to see your shared gardens.</p>
      ) : myShares.length === 0 ? (
        <p>You have not shared any gardens yet.</p>
      ) : (
        myShares.map((share) => (
          <div key={share._id} className="share-card">
            {editingShareId === share._id ? (
              <div className="share-edit-form">
                <input
                  className="form-input"
                  value={editForm.title}
                  onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Title"
                />
                <textarea
                  className="form-textarea"
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Description"
                />
                <div className="share-actions">
                  <button className="btn btn-primary" onClick={saveEdit}>Save</button>
                  <button className="btn" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="share-title">{share.title}</h3>
                <p className="share-description">{share.description}</p>
                <p className="share-meta">
                  By <strong>{share?.poster?.username || "Me"}</strong>
                </p>
                <div className="share-actions">
                  <button className="btn" onClick={() => viewGarden(share)}>View Garden</button>
                  <button className="btn" onClick={() => startEdit(share)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => removeShare(share._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </section>
  )
}

export default MyShares
