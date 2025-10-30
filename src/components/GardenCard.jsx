import { useEffect, useState, useRef } from "react"

const GardenCard = ({ position, plant, onHarvest, onRemove, onDropSeed }) => {
  const [timeLeft, setTimeLeft] = useState(null)
  const timerRef = useRef(null)

  // Timer logic
  useEffect(() => {
    if (plant && plant.expectHarvest) {
      const updateTimeLeft = () => {
        const now = new Date().getTime()
        const harvestTime = new Date(plant.expectHarvest).getTime()
        const difference = Math.max(0, harvestTime - now)
        setTimeLeft(difference)
      }

      updateTimeLeft()
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
    const seconds = Math.ceil(ms / 1000)
    return `${seconds}s left`
  }

  //https://stackoverflow.com/questions/48796926/datatransfer-getdata-and-setdata-in-ie-edge
  // Drag-and-drop handlers
  const handleDrop = (event) => {
    event.preventDefault()
    const seedData = JSON.parse(event.dataTransfer.getData("seed"))
    onDropSeed(seedData, position)
  }

  const handleDragOver = (event) => event.preventDefault()

  return (
    <div className={slotClass} onDrop={handleDrop} onDragOver={handleDragOver}>
      <h4 className="slot-title">Slot {position}</h4>

      {isEmpty ? (
        <p className="slot-empty-text">Empty</p>
      ) : (
        <div>
          <p className="slot-plant-name">{plant.plantRef?.name}</p>
          <img src={plant.plantRef?.image} alt="" />
          {!ready ? (
            <p className="slot-status">Growing ({formatTime(timeLeft)})</p>
          ) : (
            <p className="slot-status">Ready to harvest!</p>
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

            {!ready && (
              <button onClick={() => onRemove(position)} className="remove-btn">
                Remove
              </button>
            )}
          </div>
        </div>
      )}

      {isEmpty && <p className="slot-drop-hint">Drag a seed here to plant</p>}
    </div>
  )
}

export default GardenCard
