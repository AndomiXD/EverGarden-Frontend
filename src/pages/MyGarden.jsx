import React, { useState, useEffect } from "react"
import GardenGrid from "../components/GardenGrid"
import SeedSidebar from "../components/SeedSidebar"
import { GetGarden, GetSeeds, PlantSeed, RemovePlant } from "../services/GardenServices"
import { CreateShare } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"
import ShareForm from "../components/ShareForm"

const MyGarden = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedSeed, setSelectedSeed] = useState(null)

  const navigate = useNavigate()
  const handleShare = async () => {
    const title = prompt("Enter a title for your share:")
    const description = prompt("Write a short description:")
    if (!title || !description) {
      alert("Please enter both title and description")
      return
    }

    const result = await CreateShare(title, description)
    if (result) {
      alert("Your garden has been shared!")
      navigate("/feed")
    }
  }
  const loadData = async () => {
    setLoading(true)
    const gardenData = await GetGarden()
    if (gardenData) setGarden(gardenData)
    const seedsData = await GetSeeds()
    if (Array.isArray(seedsData)) setSeeds(seedsData)
    setLoading(false)
  }
  useEffect(() => {
    loadData()
  }, [])

  const handleSelectSlot = (index) => {
    setSelectedSlot(index)
  }

  const handlePlant = async () => {
    if (!selectedSeed || selectedSlot == null) {
      alert("Please select a soil and a seed first.")
      return
    }
    await PlantSeed(selectedSeed._id, selectedSlot)
    (plantId, position)
    setSelectedSlot(null)
    setSelectedSeed(null)
    await loadData()
  }

  const handleClear = () => {
    setSelectedSlot(null)
    setSelectedSeed(null)
  }

  const handleHarvest = async (index) => {
    await RemovePlant(index)
    await loadData()
  }

  if (loading) return <p>Loading garden...</p>

  return (
    <div className="page">
      <h2 className="page-title">My Garden</h2>
      <button onClick={handleShare}>🌿 Share My Garden</button>
      <div className="garden-layout">
        <main className="board-wrap">
          <GardenGrid garden={garden} onHarvest={handleHarvest} onSelectSlot={handleSelectSlot} />
        </main>
        <aside className="sidebar">
          <SeedSidebar
            seeds={seeds}
            selectedSeed={selectedSeed}
            onSelectSeed={setSelectedSeed}
            selectedSlot={selectedSlot}
            onPlant={handlePlant}
            onClear={handleClear}
          />
        </aside>
      </div>
    </div>
  )
}

export default MyGarden
