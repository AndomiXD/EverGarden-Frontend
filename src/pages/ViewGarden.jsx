import { useEffect, useState } from "react"
import { GetGarden } from "../services/GardenServices"
import GardenGrid from "../components/GardenGrid"

const ViewGarden = () => {
  const [garden, setGarden] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const g = await GetGarden()   
      setGarden(g || null)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Loading garden...</p>
  if (!garden) return <p>Garden not found.</p>

  return (
    <div className="page">
      <h2 className="page-title">{garden.name}</h2>
      <div className="board-wrap">
        <GardenGrid garden={garden} />
      </div>
      <p className="muted">{garden.description}</p>
    </div>
  )
}

export default ViewGarden
