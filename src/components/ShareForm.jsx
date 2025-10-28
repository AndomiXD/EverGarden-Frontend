import React, { useState } from "react"

const ShareForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) {
      alert("Please fill in both fields")
      return
    }
    onSubmit({ title, description })
    setTitle("")
    setDescription("")
  }

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.4)",
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          borderRadius: 12,
          padding: "20px 30px",
          width: 300,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: 10 }}>🌿 Share My Garden</h3>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Write a short description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            resize: "none",
            height: 80,
          }}
        />

        <button
          type="submit"
          style={{
            background: "#4caf50",
            color: "white",
            border: "none",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Share 🌱
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "#eee",
            color: "#333",
            border: "none",
            padding: "8px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ShareForm
