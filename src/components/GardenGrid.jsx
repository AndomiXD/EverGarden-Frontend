import GardenPosition from "./GardenPosition"

const GardenGrid = ({ garden, onHarvest, onRemove }) => {
  const position = 0
  const plant = garden.plants?.find((p) => p.position === position)

  return (
    <div className="garden-grid">
      <h2 className="garden-title">{garden.name}</h2>
      <div className="garden-grid-layout">
        <GardenPosition
          position={position}
          plant={plant}
          onHarvest={onHarvest}
          onRemove={onRemove}
        />
      </div>
    </div>
  )
}

export default GardenGrid
