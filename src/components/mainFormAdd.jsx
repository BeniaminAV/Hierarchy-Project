import React, { useState } from "react"
import FormInput from "./form"
import Button from "./button"

const MainFormAdd = () => {
  const [owner, setOwner] = useState([])
  const [task, setTask] = useState("")
  const [dataList, setDataList] = useState([])
  const [editingIndex, setEditingIndex] = useState(-1)
  const [isEditing, setIsEditing] = useState(false)
  const [openTasks, setOpenTasks] = useState([])
  const [stepValues, setStepValues] = useState([])

  const handleAdd = (event) => {
    event.preventDefault()
    if (owner && task) {
      if (editingIndex === -1) {
        const newData = { owner, task, steps: [] }
        setDataList([...dataList, newData])
      } else {
        const updatedDataList = [...dataList]
        updatedDataList[editingIndex] = {
          owner,
          task,
          steps: updatedDataList[editingIndex].steps,
        }
        setDataList(updatedDataList)
        setEditingIndex(-1)
      }
      setOwner("")
      setTask("")
      setIsEditing(false)
      setOpenTasks([])
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case "owner":
        setOwner(value)
        break
      case "task":
        setTask(value)
        break
      default:
        break
    }
  }

  const handleAddStep = (taskIndex) => {
    if (taskIndex >= 0 && taskIndex < dataList.length) {
      if (!stepValues[taskIndex]) {
        const updatedStepValues = [...stepValues]
        updatedStepValues[taskIndex] = {
          value: "",
          owner: owner,
        }
        setStepValues(updatedStepValues)
      }

      const updatedDataList = [...dataList]
      const stepsCopy = [
        ...updatedDataList[taskIndex].steps,
        {
          value: stepValues[taskIndex]?.value || "",
          owner: stepValues[taskIndex]?.owner || owner,
        },
      ]
      updatedDataList[taskIndex].steps = stepsCopy
      setDataList(updatedDataList)
    }
  }

  const handleRemoveStep = (taskIndex, stepIndex) => {
    const updatedDataList = [...dataList]
    updatedDataList[taskIndex].steps.splice(stepIndex, 1)
    setDataList(updatedDataList)
  }

  const handleRemove = (index) => {
    const updatedDataList = [...dataList]
    updatedDataList.splice(index, 1)
    setDataList(updatedDataList)
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setIsEditing(true)
    setOwner(dataList[index].owner)
    setTask(dataList[index].task)
  }

  const handleStepInputChange = (taskIndex, inputValue) => {
    setStepValues((prevStepValues) => {
      const updatedStepValues = [...prevStepValues]
      updatedStepValues[taskIndex] = {
        ...updatedStepValues[taskIndex],
        value: inputValue,
      }
      return updatedStepValues
    })
  }

  const handleStepOwnerChange = (taskIndex, inputOwner) => {
    setStepValues((prevStepValues) => {
      const updatedStepValues = [...prevStepValues]
      updatedStepValues[taskIndex] = {
        ...updatedStepValues[taskIndex],
        owner: inputOwner,
      }
      return updatedStepValues
    })
  }

  return (
    <div className="border-[1px] border-white w-[1000px]">
      <div className="flex items-center justify-center pt-20 ">
        <form onSubmit={handleAdd} className="flex items-center">
          <FormInput
            value={owner}
            onChange={handleInputChange}
            name="owner"
            placeholder={"Owner"}
          />
          <FormInput
            value={task}
            onChange={handleInputChange}
            readOnly={openTasks.length > 0}
            name="task"
            placeholder={"Add Task"}
          />
          <Button
            type="submit"
            label={editingIndex === -1 ? "Add" : "Update"}
          />
        </form>
      </div>
      <ul className="flex-row items-center justify-start pt-10 ml-10">
        {dataList.map((data, taskIndex) => (
          <li key={taskIndex} className="py-5">
            <div>
              <strong>Owner:</strong> {data.owner}, <strong>Task:</strong>{" "}
              {data.task},
            </div>
            <Button
              label={openTasks.includes(taskIndex) ? "Close Edit" : "Open"}
              onClick={() =>
                setOpenTasks((prevOpenTasks) =>
                  prevOpenTasks.includes(taskIndex)
                    ? prevOpenTasks.filter((index) => index !== taskIndex)
                    : [...prevOpenTasks, taskIndex]
                )
              }
            />
            {!isEditing && (
              <>
                <Button label={"Edit"} onClick={() => handleEdit(taskIndex)} />
                <Button
                  label={"Remove"}
                  onClick={() => handleRemove(taskIndex)}
                />
              </>
            )}
            {openTasks.includes(taskIndex) && (
              <div>
                {data.steps.map((stepObj, stepIndex) => (
                  <div
                    key={stepIndex}
                    className="flex-row py-3 pt-5 ml-10 items-center justify-between">
                    <div>
                      <strong>Step:</strong> {stepObj.value},{" "}
                      <strong>Owner:</strong> {stepObj.owner}
                      <Button
                        label={"Remove Step"}
                        onClick={() => handleRemoveStep(taskIndex, stepIndex)}
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center pt-10">
                  <p>Add Step: </p>
                  <FormInput
                    value={stepValues[taskIndex]?.value || ""}
                    onChange={(event) =>
                      handleStepInputChange(taskIndex, event.target.value)
                    }
                    name={`stepValue-${taskIndex}`}
                    placeholder={"Add Step"}
                  />
                  <FormInput
                    value={stepValues[taskIndex]?.owner || ""}
                    onChange={(event) =>
                      handleStepOwnerChange(taskIndex, event.target.value)
                    }
                    name={`stepOwner-${taskIndex}`}
                    placeholder={"Owner"}
                  />
                  <Button
                    label={"Add Step"}
                    onClick={() => handleAddStep(taskIndex)}
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainFormAdd
