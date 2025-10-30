const SeedSidebar = ({ seeds }) => {
  //https://stackoverflow.com/questions/48796926/datatransfer-getdata-and-setdata-in-ie-edge
  const handleDragStart = (event, seed) => {
    event.dataTransfer.setData("seed", JSON.stringify(seed))
  }

  return (
    <aside className="seed-sidebar">
      <h3 className="seed-title">🌱 Available Seeds</h3>

      <div className="seed-list">
        {seeds.length === 0 ? (
          <p className="no-seeds">No seeds available</p>
        ) : (
          seeds.map((seed) => (
            <div
              key={seed._id}
              draggable
              onDragStart={(event) => handleDragStart(event, seed)}
              className="seed-card"
              title="Drag this seed into your garden!"
            >
              <img
                src={seed.image}
                alt={seed.name}
                className="seed-image"
                draggable="false"
              />

              <div className="seed-info">
                <strong className="seed-name">{seed.name}</strong>
                <p className="seed-stats">
                  Cost: {seed.cost} Reward: {seed.reward}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default SeedSidebar
