import { useState } from "react"

const ShareForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert("Please fill out all fields.")
      return
    }
    onSubmit({ title, description })
    setTitle("")
    setDescription("")
  }

  return (
    <div className="share-form">
      <h3>Share Your Garden</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My lovely garden"
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Talk about your plants..."
        />

        <div className="btns">
          <button type="submit">Share</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ShareForm
