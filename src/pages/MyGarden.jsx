import React, { useState, useEffect } from "react"
import GardenGrid from "../components/GardenGrid"
import SeedSidebar from "../components/SeedSidebar"
import { GetGarden, GetSeeds, PlantSeed, HarvestPlant } from "../services/GardenServices"

const MyGarden = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)

    const gardenData = await GetGarden()
    if (gardenData) {
      setGarden(gardenData)
    }else {
      setGarden(null)
    }

    const seedsData = await GetSeeds()
    if(Array.isArray(seedsData)){
      setSeeds(seedsData)
    } else{
      setSeeds([])
    }
    setLoading(false)
  }

  const handlePlant = async ({seedId, slotIndex}) => {
    await PlantSeed(seedId, slotIndex)
    await loadData()
  }

  const handleHarvest = async (index) => {
    await HarvestPlant(index)
    await loadData()
  }

  if (loading)
    return <p>Loading garden...</p>

  return (
    <div className="page">
      <h2 className="page-title">My Garden</h2>
      <div className="garden-layout">
        <main className="board-wrap">
          <GardenGrid garden={garden} onHarvest={handleHarvest}/>
        </main>
        <aside className="sidebar">
      <SeedSidebar seeds={seeds} onPlant={handlePlant} />
        </aside>
      </div>
    </div>
  )
}
export default MyGarden
