import { useState } from "react"

const SeedSidebar = ({ seeds, onPlant }) => {
  const [selected, setSelected] = useState(null)
  const [slotIndex, setSlotIndex] = useState("")

  const handlePlant = () => {
    if (!selected) {
      alert("Pick a seed first!")
      return
    }
    const index = slotIndex === "" ? undefined : Number(slotIndex)
    onPlant({ seedId: selected._id, slotIndex: index })
    setSlotIndex("")
  }

  return (
    <aside>
      <h3>Seeds</h3>

      {Array.isArray(seeds) && seeds.length > 0? (
        seeds.map((s) => (
        <div key={s._id} onClick={() => setSelected(s)}>
          <strong>{s.name}</strong>
          <p>Cost: {s.cost}</p>
          <p>Reward: {s.reward}</p>
        </div>
      ))
    ):(
      <p>No seeds available.</p>
    )}

      <input
        placeholder="slot index (optional)"
        value={slotIndex}
        onChange={(e) => setSlotIndex(e.target.value)}
      />
      <button onClick={handlePlant}>Plant</button>
    </aside>
  )
}

export default SeedSidebar
