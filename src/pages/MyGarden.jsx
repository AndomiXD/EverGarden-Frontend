import React, { useState, useEffect } from "react"
import SeedSidebar from "../components/SeedSidebar"
import { GetGarden, GetSeeds, PlantSeed, RemovePlant } from "../services/GardenServices"
import { CreateShare } from "../services/ShareServices"
import { useNavigate } from "react-router-dom"
import ShareForm from "../components/ShareForm"

const MyGarden = () => {
  const [garden, setGarden] = useState(null)
  const [seeds, setSeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSeed, setSelectedSeed] = useState(null)
  const [balance, setBalance] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [loadingShare, setLoadingShare] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const loadData = async () => {
    setLoading(true)
    const garden = await GetGarden()
    if (garden) {
      setGarden(garden)
      if (garden.balance !== undefined) setBalance(garden.balance)
    }
    const slot = await GetSeeds()
    if (Array.isArray(slot)) setSeeds(slot)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])


  const POSITION = 0

  const handlePlant = async () => {
    if (!selectedSeed) {
      alert("Please choose a seed first.")
      return
    }
    const plantId = selectedSeed._id
    const res = await PlantSeed(plantId, POSITION)
    if (!res) return
    if (res.balance !== undefined) setBalance(res.balance)
    setSelectedSeed(null)
    await loadData()
  }

  const handleRemove = async () => {
    const res = await RemovePlant(POSITION)
    if (!res) return
    if (res.balance !== undefined) setBalance(res.balance)
    await loadData()
  }

  const handleShareSubmit = async ({ title, description }) => {
    setLoadingShare(true)
    const result = await CreateShare(title, description)
    setLoadingShare(false)

    if (result) {
      setMessage("Your garden has been shared!")
      setShowForm(false)
      navigate("/feed")
    }
  }

  if (loading) return <p>Loading garden...</p>

  const plantSlot = garden?.plants?.find((p) => p.position === POSITION) || null
  const plantName = plantSlot?.plantRef?.name

  return(
    <div className="page">
      <div
        className="header-row"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="page-title">My Garden</h2>
        <div
          className="balance-box"
          style={{
            background: "#e8f5e9",
            padding: "8px 14px",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          💰 Balance: {balance} coins
        </div>
      </div>


      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#81c784",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          🌿 Share My Garden
        </button>
      )}

      {showForm && (
        <ShareForm
          onSubmit={handleShareSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      {loadingShare && <p>Sharing your garden...</p>}


      <div style={{ marginTop: 20, display: "flex", gap: 20 }}>

        <div
          className="single-slot"
          style={{
            width: 140,
            height: 140,
            borderRadius: 12,
            background: "#6b4e33",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          <small style={{ opacity: 0.7, marginBottom: 6 }}>#1</small>

          {plantSlot ? (
            <>
              <strong style={{ fontSize: 18 }}>{plantName || "🌱 Seed"}</strong>
              <button
                onClick={handleRemove}
                style={{
                  marginTop: 8,
                  background: "#fbe9e7",
                  color: "#a33",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>
            </>
          ) : (
            <span style={{ opacity: 0.9 }}>Empty</span>
          )}
        </div>

        <aside className="sidebar" style={{ width: 320 }}>
          <SeedSidebar
            seeds={seeds}
            selectedSeed={selectedSeed}
            onSelectSeed={setSelectedSeed}
            selectedSlot={0}
            onPlant={handlePlant}
            onClear={() => setSelectedSeed(null)}
          />
        </aside>
      </div>
    </div>
  )
}

export default MyGarden
