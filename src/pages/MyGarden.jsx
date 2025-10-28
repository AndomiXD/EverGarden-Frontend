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
    <div>
      <h2>My Garden</h2>
      <GardenGrid garden={garden} onHarvest={handleHarvest}/>
      <SeedSidebar seeds={seeds} onPlant={handlePlant} />
    </div>
  )
}
export default MyGarden
