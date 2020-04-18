import React, { Component, useState } from 'react';
import '../scss/Todo.scss';
import { TODO_STATUS, ERROR_MSG } from '../common/constants';
import ToDoItem from './ToDoItem';

export default class ToDoApp extends Component {

  constructor() {
    super()
    this.state = {
      todoList: [],
      todo: '',
      error: ''
    }
  }

  onToDoChange = (event) => {
    event.stopPropagation();
    this.setState({ todo: event.target.value })
  }

  updateToDo = (todo) => {
    const todoItemIndex = this.state.todoList.findIndex((t) => t.id === todo.id);
    const toToDoList = this.state.todoList.slice(0);
    toToDoList[todoItemIndex] = todo;
    this.setState({ todoList: toToDoList })
  }

  onDeleteToDo = (id) => {
    const todoItemIndex = this.state.todoList.findIndex((t) => t.id === id);
    const toToDoList = this.state.todoList.slice(0);
    toToDoList.splice(todoItemIndex, 1);
    this.setState({ todoList: toToDoList });
  }

  addToDo = () => {
    const newToDoItem = { id: this.state.todoList.length + 1, item: this.state.todo, status: TODO_STATUS.IN_PROGRESS }
    if (this.isValidToDo(newToDoItem)) {
      this.setState({ todoList: this.state.todoList.concat(newToDoItem), todo: '', error: '' })
    } else {
      this.setState({ error: ERROR_MSG.ALREADY_EXISTS });
    }
  }

  getToDoItems = () => {
    return this.state.todoList.filter((todo) => todo.status === TODO_STATUS.IN_PROGRESS)
  }

  getCompletedItems = () => {
    return this.state.todoList.filter((todo) => todo.status === TODO_STATUS.COMPLETED)
  }

  onKeyDown = (e) => {
    if (e.keyCode == 13 && this.isValidToDo(this.state.todo)) {
      this.addToDo()
    }
  }

  isValidToDo = (todo) => {
    return !this.state.todoList.some((t) => t.item === todo.item && t.id != todo.id)
  }

  render() {
    const inProgressToDoItems = this.getToDoItems()
    const completedToDoItems = this.getCompletedItems()
    return(
      <div className="todo-container">
        <h3>Simple TODO App!!!</h3>
        <div className="header">ADD ITEM</div>
        <input type="text" className="todo-input" onKeyDown={this.onKeyDown} onChange={this.onToDoChange} value={this.state.todo} />
        <button className="add-btn" onClick={this.addToDo} disabled={this.state.todo.length <=0}>Add</button>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <div className="header">TODO</div>
          {inProgressToDoItems.length 
            ? inProgressToDoItems.map((todo, i) => <ToDoItem todo={todo} key={i} updateToDo={this.updateToDo} onDeleteToDo={this.onDeleteToDo} isValidToDo={this.isValidToDo} />)
            : <div className="no-items-text">No To Do items</div>}
        <div className="header">COMPLETED</div>
          {completedToDoItems.length 
            ? completedToDoItems.map((todo, i) => <ToDoItem todo={todo} key={i} updateToDo={this.updateToDo} onDeleteToDo={this.onDeleteToDo} isValidToDo={this.isValidToDo}/>)
            : <div className="no-items-text">No completed Items</div>}
      </div>
    );
  }
}
