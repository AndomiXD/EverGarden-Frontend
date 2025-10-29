import { useEffect, useState } from "react"
import {
  GetGarden,
  GetSeeds,
  PlantSeed,
  HarvestPlant,
  RemoveSeed,
} from "../services/GardenServices"
import GardenGrid from "../components/GardenGrid"
import SeedSidebar from "../components/SeedSidebar"

const GardenPage = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const g = await GetGarden()
      const s = await GetSeeds()
      setGarden(g?.garden || g)
      setSeeds(s || [])
    }
    fetchData()
  }, [])

  const handlePlant = async ({ plantId, position }) => {
    const data = await PlantSeed(plantId, position)
    if (data?.garden) setGarden(data.garden)
  }

  const handleHarvest = async (position) => {
    const data = await HarvestPlant(position)
    if (data?.garden) setGarden(data.garden)
  }

  const handleRemove = async (position) => {
    const data = await RemoveSeed(position)
    if (data?.garden) setGarden(data.garden)
  }

  if (!garden) return <p className="loading-text"> Loading your garden...</p>

  return (
    <div className="garden-page">
      <div className="garden-grid-container">
        <GardenGrid
          garden={garden}
          onHarvest={handleHarvest}
          onRemove={handleRemove}
        />
      </div>
      <div className="seed-sidebar-container">
        <SeedSidebar seeds={seeds} onPlant={handlePlant} />
      </div>
    </div>
  )
}

export default GardenPage
