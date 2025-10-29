import { useEffect, useState } from "react"
import {
  GetGarden,
  GetSeeds,
  PlantSeed,
  HarvestPlant,
  RemoveSeed,
  toggleAutoHarvest,
} from "../services/GardenServices"
import GardenGrid from "../components/GardenGrid"
import SeedSidebar from "../components/SeedSidebar"

const GardenPage = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])
  const [balance, setBalance] = useState(0)
  const [autoHarvest, setAutoHarvest] = useState(garden?.autoHarvest)

  useEffect(() => {
    const fetchData = async () => {
      const garden = await GetGarden()
      const seed = await GetSeeds()

      setGarden(garden?.garden || garden)
      setBalance(garden?.balance || 0)
      setSeeds(seed || [])
    }
    fetchData()
  }, [])

  // Plant handler (drag-and-drop or sidebar)
  const handlePlant = async ({ plantId, position }) => {
    const data = await PlantSeed(plantId, position)
    if (data?.garden) setGarden(data.garden)
    if (data?.balance) setBalance(data.balance)
  }

  // Harvest handler
  const handleHarvest = async (position) => {
    const data = await HarvestPlant(position)
    if (data?.garden) setGarden(data.garden)
    if (data?.balance) setBalance(data.balance)
  }

  // Remove handler
  const handleRemove = async (position) => {
    const data = await RemoveSeed(position)
    if (data?.garden) setGarden(data.garden)
  }

  const onDropSeed = async (seed, position) => {
    if (!seed?._id) return
    await handlePlant({ plantId: seed._id, position })
  }

  if (!garden) return <p className="loading-text"> Loading your garden...</p>

  return (
    <div className="garden-page">
      <div className="garden-grid-container">
        <div className="balance-display">
          <strong>Balance:</strong> {balance} coins
        </div>
        <div className="auto-harvest-toggle">
          <label>
            {/* {!garden.garden?.autoHarvest ? (
              <button style={{ background: "green" }}>Auto Harvest</button>
            ) : (
              <button style={{ background: "red" }}>Auto Harvest</button>
            )} */}
            Auto-Harvest:
            <input
              type="checkbox"
              checked={autoHarvest}
              onChange={toggleAutoHarvest}
            />
          </label>
        </div>
        <GardenGrid
          garden={garden}
          onHarvest={handleHarvest}
          onRemove={handleRemove}
          onDropSeed={onDropSeed}
        />
      </div>

      <div className="seed-sidebar-container">
        <SeedSidebar seeds={seeds} />
      </div>
    </div>
  )
}

export default GardenPage
