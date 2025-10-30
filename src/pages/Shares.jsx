import { useEffect, useState } from "react"
import { GetAllShares } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"

const Shares = () => {
  const [shares, setShares] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const data = await GetAllShares()
      setShares(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    load()
  }, [])

  const handleView = (share) => {
    const gardenId =
      typeof share.garden === "object" ? share.garden?._id : share.garden
    if (gardenId) navigate(`/gardens/${gardenId}`)
  }

  if (loading) return <p>Loading shared gardens...</p>

  return (
    <section className="share-feed">
      <h2>Shared Gardens</h2>
      {shares.length === 0 ? (
        <p>No shared gardens yet.</p>
      ) : (
        <div className="share-list">
          {shares.map((s) => (
            <div key={s._id} className="share-card">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <p>
                <strong>By:</strong>{" "}
                {s?.poster?.username || s.poster || "Unknown"}
              </p>
              <button onClick={() => handleView(s)}>View Garden</button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Shares
