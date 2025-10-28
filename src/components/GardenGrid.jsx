import React from "react"
import GardenSlot from "./GardenSlot"

const GardenGrid = ({ garden, onHarvest, onSelectSlot }) => {
  return (
    <div className="garden">
      {garden && garden.slots ? (
        <div className="garden-grid">
          {garden.slots.map((slot, i) => (
            <GardenSlot
              key={i}
              slot={slot}
              index={i}
              onHarvest={onHarvest}
              onSelectSlot={onSelectSlot}
            />
          ))}
        </div>
      ) : (
        <p>No slots yet!</p>
      )}
    </div>
  )
}

export default GardenGrid
