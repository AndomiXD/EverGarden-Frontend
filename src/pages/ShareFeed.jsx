import { useEffect, useState } from "react"
import { GetAllShares } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"

const ShareFeed = () => {
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
    const gid = typeof share.garden === 'object' ? share.garden?._id : share.garden
    if (gid) navigate(`/gardens/${gid}`)
  }

  return (
    <section>
      <h2>Shared Gardens</h2>
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
