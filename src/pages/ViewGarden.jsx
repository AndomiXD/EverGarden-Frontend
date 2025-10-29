
//for protecting my application in front end for route use token interseptor : Client.post('/item')if no protected i can use axios.
// if somebody try to go will say ops u have to sign in , redirect them to page say ops u have to be sign in

import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { GetGardenById } from "../services/GardenServices"
import GardenGrid from "../components/GardenGrid"


const ViewGarden = () => {
  const [garden, setGarden] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await GetGardenById(id)
      setGarden(data || null)
      setLoading(false)
    }
    load()
  }, [id])

  // Build a 30-slot view for the grid from plants[]
  const buildSlots = (g, size = 30) => {
    if (!g) return []
    if (Array.isArray(g.slots)) return g.slots

    const slots = Array.from({ length: size }, () => ({ status: "empty" }))
    if (!Array.isArray(g.plants)) return slots

    const now = Date.now()
    g.plants.forEach((p) => {
      const index = Number(p.position) || 0
      const expected = p?.expectHarvest ? new Date(p.expectHarvest).getTime() : 0
      const isReady = expected ? now >= expected : false
      slots[index] = {
        status: isReady ? "ready" : "planted",
        seed: { name: p?.plantRef?.name || "Seed" }
      }
    })
    return slots
  }

  const slots = useMemo(() => buildSlots(garden, 30), [garden])

  if (loading) return <p>Loading garden...</p>
  if (!garden) return <p>Garden not found.</p>

  return (
    <div className="view-garden-page">
      <h2 className="page-title">{garden.name || "Garden"}</h2>
      <div className="garden-board">
        <GardenGrid garden={{ slots }} />
      </div>
      {garden.description && <p className="garden-description">{garden.description}</p>}
    </div>
  )
}

export default ViewGarden
