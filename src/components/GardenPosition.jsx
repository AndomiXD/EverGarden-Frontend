import { useEffect, useState, useRef } from "react"

const GardenPosition = ({ position, plant, onHarvest, onRemove }) => {
  const [timeLeft, setTimeLeft] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (plant && plant.expectHarvest) {
      const updateTimeLeft = () => {
        const now = new Date().getTime()
        const harvestTime = new Date(plant.expectHarvest).getTime()
        const diff = Math.max(0, harvestTime - now)
        setTimeLeft(diff)
      }

      updateTimeLeft() // initialize immediately upon logging in
      timerRef.current = setInterval(updateTimeLeft, 1000)

      return () => clearInterval(timerRef.current)
    }
  }, [plant])

  const ready = plant && timeLeft === 0
  const isEmpty = !plant

  let slotClass = "garden-slot"
  if (isEmpty) slotClass += " slot-empty"
  else if (ready) slotClass += " slot-ready"
  else slotClass += " slot-growing"

  const formatTime = (ms) => {
    const s = Math.ceil(ms / 1000)
    return `${s}s left`
  }

  return (
    <div className={slotClass}>
      <h4 className="slot-title">Plot {position}</h4>

      {isEmpty ? (
        <p className="slot-empty-text">Empty</p>
      ) : (
        <div>
          <p className="slot-plant-name">{plant.plantRef?.name || "Unknown"}</p>

          {!ready ? (
            <p className="slot-status">⏳ Growing ({formatTime(timeLeft)})</p>
          ) : (
            <p className="slot-status">🌾 Ready to harvest!</p>
          )}

          <div className="slot-buttons">
            {ready && (
              <button
                onClick={() => onHarvest(position)}
                className="harvest-btn"
              >
                Harvest
              </button>
            )}
            <button onClick={() => onRemove(position)} className="remove-btn">
              Remove ❌
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GardenPosition
