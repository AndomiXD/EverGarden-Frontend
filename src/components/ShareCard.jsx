import { Link } from "react-router-dom"

const ShareCard = ({ share }) => {
  if (!share) return null

  return (
    <div className="share-card">
      <h3 className="share-title">{share.title}</h3>
      <p className="share-desc">{share.description}</p>
      <p className="share-meta">
        by <strong>{share?.poster?.username || "Unknown"}</strong>
      </p>
      <Link
        className="btn-view"
        to={`/gardens/${share.garden?._id || share.garden}`}
      >
        View Garden
      </Link>

    </div>
  )
}

export default ShareCard
