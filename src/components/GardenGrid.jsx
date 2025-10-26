import React from "react"
import GardenSlot from "./GardenSlot"

const GardenGrid = ({ garden, onHarvest})=>{
  return(
    <div>
      <h2>My Garden</h2>
      {garden && garden.slots? (
        garden.slots.map ((slot, i)=> (
        <GardenSlot key={i} slot={slot} index={i} onHarvest={onHarvest} />
        ))
      ):(
        <p>No slots yet!</p>
      )}
    </div>
  )
}
export default GardenGrid
