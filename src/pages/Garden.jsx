import { useEffect, useState } from "react"
import {
  GetGarden,
  GetSeeds,
  PlantSeed,
  HarvestPlant,
  RemoveSeed,
  toggleAutoHarvest,
  CreateGarden,
} from "../services/GardenServices"
import GardenGrid from "../components/GardenGrid"
import SeedSidebar from "../components/SeedSidebar"

const GardenPage = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])
  const [balance, setBalance] = useState(0)
  const [autoHarvest, setAutoHarvest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let gardenData = await GetGarden()
        if (!gardenData || gardenData.error || !gardenData.garden) {
          const newGarden = await CreateGarden()
          gardenData = newGarden
        }

        const seedData = await GetSeeds()

        setGarden(gardenData?.garden || gardenData)
        setBalance(gardenData?.balance || 0)
        setSeeds(seedData || [])
        setAutoHarvest(
          gardenData?.garden?.autoHarvest || gardenData?.autoHarvest || false
        )
      } catch (error) {
        console.error("Error loading garden page:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePlant = async ({ plantId, position }) => {
    const data = await PlantSeed(plantId, position)
    if (data?.garden) setGarden(data.garden)
    if (data?.balance) setBalance(data.balance)
  }

  const handleHarvest = async (position) => {
    const data = await HarvestPlant(position)
    if (data?.garden) setGarden(data.garden)
    if (data?.balance) setBalance(data.balance)
  }

  const handleRemove = async (position) => {
    const data = await RemoveSeed(position)
    if (data?.garden) setGarden(data.garden)
  }

  const handleToggleAutoHarvest = async () => {
    const data = await toggleAutoHarvest()
    if (data?.autoHarvest !== undefined) {
      setAutoHarvest(data.autoHarvest)
      setGarden((prev) => ({ ...prev, autoHarvest: data.autoHarvest }))
    }
  }

  const onDropSeed = async (seed, position) => {
    if (!seed?._id) return

    await handlePlant({ plantId: seed._id, position })
  }

  if (loading) return <p className="loading-text">Loading your garden...</p>

  return (
    <div className="garden-page">
      <div className="garden-grid-container">
        <div className="balance-display">
          <strong>Balance:</strong> {balance} coins
        </div>

        <div className="auto-harvest-toggle">
          <label>
            Auto-Harvest:
            <input
              type="checkbox"
              checked={autoHarvest}
              onChange={handleToggleAutoHarvest}
            />
            (Only works when offline)
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
