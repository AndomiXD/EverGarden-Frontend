import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { GetGardenById } from "../services/GardenServices"

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

  const buildSlots = (tempGarden, size = 12) => {
    if (!tempGarden) return []
    const slots = Array.from({ length: size }, () => ({ status: "empty" }))
    if (!Array.isArray(tempGarden.plants)) return slots

    tempGarden.plants.forEach((plant) => {
      const index = plant.position
      if (index >= 0 && index < size) {
        slots[index] = {
          status: "planted",
          plant: plant?.plantRef?.name || "Unknown Plant",
          image: plant?.plantRef?.image || null,
        }
      }
    })
    return slots
  }

  const slots = useMemo(() => buildSlots(garden, 12), [garden])

  if (loading) return <p>Loading garden...</p>
  if (!garden) return <p>Garden not found.</p>

  return (
    <div className="view-garden-page">
      <h2 className="page-title">{garden.name || "Garden"}</h2>

      <div className="garden-grid">
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`garden-slot ${
              slot.status === "empty" ? "slot-empty" : "slot-planted"
            }`}
          >
            {slot.status === "planted" ? (
              <>
                {slot.image ? (
                  <img
                    src={slot.image}
                    alt={slot.plant}
                    className="plant-image"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="no-image">🌱</div>
                )}
                <p className="plant-name">{slot.plant}</p>
              </>
            ) : (
              <p className="empty-slot">Empty</p>
            )}
          </div>
        ))}
      </div>

      {garden.description && (
        <p className="garden-description">{garden.description}</p>
      )}
    </div>
  )
}

export default ViewGarden
