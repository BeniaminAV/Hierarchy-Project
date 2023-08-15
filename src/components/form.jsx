import React from "react"

const FormInput = ({ placeholder, onChange, type, name, value }) => {
  return (
    <div>
      <input
        className="p-2 mx-2 rounded-md text-black"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInput
