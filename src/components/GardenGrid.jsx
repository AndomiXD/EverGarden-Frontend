import React from "react"
import GardenSlot from "./GardenSlot"

const GardenGrid = ({ garden, onHarvest})=>{
  return(
    <div className="garden">
      {garden && garden.slots? (
        <div className="garden-grid">
        {garden.slots.map ((slot, i) => (
        <GardenSlot key={i} slot={slot} index={i} onHarvest={onHarvest} />
        ))}
        </div>
      ):(
        <p>No slots yet!</p>
      )}
    </div>
  )
}
export default GardenGrid
