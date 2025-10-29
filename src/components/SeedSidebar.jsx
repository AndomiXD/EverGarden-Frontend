const SeedSidebar = ({ seeds }) => {
  //https://stackoverflow.com/questions/48796926/datatransfer-getdata-and-setdata-in-ie-edge
  const handleDragStart = (event, seed) => {
    event.dataTransfer.setData("seed", JSON.stringify(seed))
  }

  return (
    <aside className="seed-sidebar">
      <h3 className="seed-title">Seeds</h3>
      <div className="seed-list">
        {seeds.map((seed) => (
          <div
            key={seed._id}
            draggable
            onDragStart={(event) => handleDragStart(event, seed)}
            className="seed-card"
          >
            <strong>{seed.name}</strong>
            <p>Cost: {seed.cost}</p>
            <p>Reward: {seed.reward}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SeedSidebar
