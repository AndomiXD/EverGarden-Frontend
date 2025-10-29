import { useState } from "react"

const SeedSidebar = ({ seeds, onPlant }) => {
  const [selected, setSelected] = useState(null)
  const [position, setPosition] = useState("")

  const handlePlant = () => {
    if (!selected) return alert("Pick a seed first!")
    const pos = position === "" ? 0 : Number(position)
    onPlant({ plantId: selected._id, position: pos })
    setPosition("")
  }

  return (
    <aside className="seed-sidebar">
      <h3 className="seed-title">Seeds</h3>
      <div className="seed-list">
        {seeds.length ? (
          seeds.map((seed) => (
            <div
              key={seed._id}
              onClick={() => setSelected(seed)}
              className={`seed-card ${
                selected?._id === seed._id ? "selected" : ""
              }`}
            >
              <strong>{seed.name}</strong>
              <p>Cost: {seed.cost}</p>
              <p>Reward: {seed.reward}</p>
            </div>
          ))
        ) : (
          <p className="no-seeds">No seeds available</p>
        )}
      </div>

      <input
        type="number"
        placeholder="Position (e.g. 0)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="position-input"
      />
      <button onClick={handlePlant} className="plant-btn">
        Plant 🌱
      </button>
    </aside>
  )
}

export default SeedSidebar
