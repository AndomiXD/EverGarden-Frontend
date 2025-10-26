import React from "react"

const GardenSlot = ({ slot, index, onHarvest }) => {
  const isEmpty = !slot || slot.status === "empty"
  const isReady = slot && slot.status == "ready"

  return (
    <div>
      <h4>Slot {index}</h4>
      {isEmpty?(
        <p>Empty</p>
      ):(
        <div>
          <p>{slot.seed&& slot.seed.name}</p>
          {isReady &&(
            <button onClick={()=>onHarvest(index)}>
              Harvest
            </button>
          )}
          </div>
      )}
    </div>
  )
}

export default GardenSlot
