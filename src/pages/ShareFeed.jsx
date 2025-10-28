import { useEffect, useState } from "react"
import { GetAllShares } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"

const ShareFeed = ({ user }) => {
  const [shares, setShares] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const data = await GetAllShares()
      setShares(Array.isArray(data) ? data : [])
    }
    load()
  }, [])

  const handleView = (share) => {
    const posterId = typeof share.poster === 'object' ? share.poster._id : share.poster
    if (user?.id && posterId && user.id === posterId) {
      navigate('/garden')
    } else {
      alert("This server only lets you view your own garden. (No /gardens/:id endpoint.)")
    }
  }

  return (
    <section>
      <h2> Shared Gardens</h2>
      {shares.length === 0 ? (
        <p>No shared gardens yet.</p>
      ) : (
        shares.map((s) => (
          <div key={s._id} className="share-card">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            <p><strong>By:</strong> {s?.poster?.username || s.poster || 'Unknown'}</p>
            <button onClick={() => handleView(s)}>View Garden</button>
          </div>
        ))
      )}
    </section>
  )
}
export default ShareFeed
