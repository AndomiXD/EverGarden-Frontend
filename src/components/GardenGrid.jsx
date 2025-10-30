import GardenCard from "./GardenCard"

const GardenGrid = ({ garden, onHarvest, onRemove, onDropSeed }) => {
  return (
    <div className="garden-grid">
      <div className="garden-grid-layout">
        {/* https://stackoverflow.com/questions/68737171/how-to-create-a-fixed-length-array-in-reactjs */}

        {/* we could add a new field in the model for the length */}
        {Array.from({ length: 12 }).map((_, position) => {
          const plant = garden.plants?.find(
            (plant) => plant.position === position
          )
          return (
            <GardenCard
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
