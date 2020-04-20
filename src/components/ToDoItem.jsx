import React, { useState } from 'react'
import { TODO_STATUS, ERROR_MSG } from '../common/constants'
import classNames from 'classnames'

const ToDoItem = ({ todo, updateToDo, onDeleteToDo, isValidToDo }) => {
  const [todoItem, setToDoItem] = useState(todo.item)
  const [isEditable, setEditable] = useState(false)
  const [error, setError] = useState(false)
  const onChangeToDo = (e) => {
    const value = e.target.value
    const updatedToDo = { ...todo, item: value.trim() }
    setToDoItem(value)
    setError('')
    if (isValidToDo(updatedToDo)) {
      updateToDo(updatedToDo)
    } else {
      setError(ERROR_MSG.ALREADY_EXISTS)
    }
  }

  const onSaveToDo = () => {
    if (error) return
    setEditable(false)
    setError('')
  }

  const toggleStatus = (status) => (status == TODO_STATUS.IN_PROGRESS ? TODO_STATUS.COMPLETED : TODO_STATUS.IN_PROGRESS)

  const updateStatus = () => {
    updateToDo({ ...todo, status: toggleStatus(todo.status) })
  }

  const moveCursorToEnd = (event) => {
    let tempValue = event.target.value
    event.target.value = ''
    event.target.value = tempValue
  }

  return (
    <div className="todo-item-container">
      <div>
        <input
          type="checkbox"
          className="todo-check"
          onChange={updateStatus}
          checked={todo.status === TODO_STATUS.COMPLETED}
        />
        <div className={classNames({ 'todo-item': true, completed: todo.status === TODO_STATUS.COMPLETED })}>
          {isEditable ? (
            <input
              type="text"
              className="todo-edit-input"
              autoFocus
              onFocus={moveCursorToEnd}
              onChange={onChangeToDo}
              value={todoItem}
            />
          ) : (
            <span className="todo-item-text">{todoItem}</span>
          )}
        </div>
        {isEditable ? (
          <label className="save-todo" onClick={onSaveToDo}>
            Save
          </label>
        ) : (
          <label className="edit-todo" onClick={() => setEditable(true)}>
            Edit
          </label>
        )}
        <label className="delete-todo" onClick={() => onDeleteToDo(todo.id)}>
          Delete
        </label>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default ToDoItem
