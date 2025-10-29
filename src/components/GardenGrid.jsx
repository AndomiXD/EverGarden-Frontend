import GardenPosition from "./GardenPosition"

const GardenGrid = ({ garden, onHarvest, onRemove, onDropSeed }) => {
  const totalSlots = 12 // we could add a new field in the model for this

  return (
    <div className="garden-grid">
      <h2 className="garden-title">{garden.name}</h2>
      <div className="garden-grid-layout">
        {Array.from({ length: totalSlots }).map((_, position) => {
          const plant = garden.plants?.find((p) => p.position === position)
          return (
            <GardenPosition
              key={position}
              position={position}
              plant={plant}
              onHarvest={onHarvest}
              onRemove={onRemove}
              onDropSeed={onDropSeed}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GardenGrid
