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
  const [balance, setBalance] = useState(0) // 👈 track user balance
  const [showForm, setShowForm] = useState(false)
  const [loadingShare, setLoadingShare] = useState(false)

  const navigate = useNavigate()

  const loadData = async () => {
    setLoading(true)
    const g = await GetGarden()
    if (g) {
      setGarden(g)
      if (g.balance) setBalance(g.balance) // 👈 update balance if included in response
    }
    const s = await GetSeeds()
    if (Array.isArray(s)) setSeeds(s)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSelectSlot = (index) => {
    setSelectedSlot(Number(index))
  }

  const handlePlant = async () => {
    if (!selectedSeed) return alert("Pick a seed first.")
    if (selectedSlot == null) return alert("Select a soil tile first.")

    const plantId = selectedSeed._id
    const position = Number(selectedSlot)

    const res = await PlantSeed(plantId, position)
    if (res && res.balance !== undefined) {
      setBalance(res.balance) // 👈 update after planting
    }

    setSelectedSeed(null)
    setSelectedSlot(null)
    await loadData()
  }

  const handleHarvest = async (index) => {
    const res = await RemovePlant(Number(index))
    if (res && res.balance !== undefined) {
      setBalance(res.balance)
    }
    await loadData()
  }

  const handleClear = () => {
    setSelectedSeed(null)
    setSelectedSlot(null)
  }

  const handleShareSubmit = async ({ title, description }) => {
    setLoadingShare(true)
    const result = await CreateShare(title, description)
    setLoadingShare(false)
    if (result) {
      alert("Your garden has been shared!")
      setShowForm(false)
      navigate("/feed")
    }
  }

  if (loading) return <p>Loading garden...</p>

  return (
    <div className="page">
      <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 className="page-title">My Garden</h2>
        <div className="balance-box" style={{ background: "#e8f5e9", padding: "8px 14px", borderRadius: "10px" }}>
          💰 <strong>Balance:</strong> {balance} coins
        </div>
      </div>

      {!showForm && (
        <button onClick={() => setShowForm(true)}>🌿 Share My Garden</button>
      )}
      {showForm && (
        <ShareForm onSubmit={handleShareSubmit} onCancel={() => setShowForm(false)} />
      )}
      {loadingShare && <p>Sharing your garden...</p>}

      <div className="garden-layout">
        <main className="board-wrap">
          <GardenGrid
            garden={garden}
            onHarvest={handleHarvest}
            onSelectSlot={handleSelectSlot}
          />
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
