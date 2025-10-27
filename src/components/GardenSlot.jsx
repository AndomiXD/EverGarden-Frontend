import React from "react"

const GardenSlot = ({ slot, index, onHarvest }) => {
  const isEmpty = !slot || slot.status === "empty"
  const isReady = slot && slot.status === "ready"
  const hasSeed = slot && slot.seed
  return (
    <div className={`slot ${isEmpty ? "slot-empty" : ""} ${
        isReady ? "slot-ready" : ""
      }`}>
      <div className="slot-content">
        <div className="slot-index">#{index + 1}</div>
        {isEmpty ? (
          <div className="slot-empty-label">Empty</div>
      ):(
        <>
        <div className="plant-name">{hasSeed && slot.seed.name}</div>
            {isReady && (
              <button
                className="btn btn-harvest"
                onClick={() => onHarvest(index)}
              >
                Harvest
              </button>
          )}
          </>
      )}
          </div>
    </div>
  )
}

export default GardenSlot
