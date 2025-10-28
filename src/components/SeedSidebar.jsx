import { useState, useEffect } from "react"

const SeedSidebar = ({ seeds, selectedSeed, onSelectSeed, selectedSlot, onPlant, onClear }) => {
  const [localSlot, setLocalSlot] = useState("")

  useEffect(() => {
    if (selectedSlot == null) setLocalSlot("")
    else setLocalSlot(String(selectedSlot))
  }, [selectedSlot])

  return (
    <aside className="seed-sidebar">
      <h3 className="seed-title">Seeds</h3>

      {Array.isArray(seeds) && seeds.length > 0 ? (
        seeds.map((s) => (
          <div
            key={s._id}
            className={`seed-card ${selectedSeed?._id === s._id ? "selected" : ""}`}
            onClick={() => onSelectSeed(s)}
          >
            <strong>{s.name}</strong>
            <p>Cost: {s.cost}</p>
            <p>Reward: {s.reward}</p>
          </div>
        ))
      ) : (
        <p className="no-seeds">No seeds available.</p>
      )}

      <input
        className="slot-input"
        placeholder="slot index (0-29)"
        value={localSlot}
        onChange={(e) => setLocalSlot(e.target.value)}
        disabled
        title="Click a soil tile to choose a slot"
      />

      <button className="btn-plant" onClick={onPlant}>Plant</button>
      <button className="btn-clear" onClick={onClear}>Clear selection</button>

      <p className="tip-text">
        Tip: click a soil tile to choose the slot, then click a seed and press Plant.
      </p>
    </aside>
  )
}

export default SeedSidebar
