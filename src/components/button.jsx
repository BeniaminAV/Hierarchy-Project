import React from "react"

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="bg-rose-500 p-2 mx-2 rounded-md">
      {label}
    </button>
  )
}

export default Button
