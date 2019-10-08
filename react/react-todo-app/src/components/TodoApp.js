import React, { Component } from 'react'
import { Table, Checkbox, Button } from 'semantic-ui-react'

import TodoItem from './TodoItem'

const headers = {
  'Content-Type': 'application/json',
}

class TodoApp extends Component {
  state = {
    todos: [],
    newTodo: '',
  }

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos = () => {
    fetch('/todos')
      .then(data => data.json())
      .then(todos => this.setState({ todos }))
      .catch(err => console.error({ err }))
  }

  handleToggleAll = () => {
    const [...todos] = this.state.todos
    const allToggled = todos.every(todo => todo.completed)
    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: !allToggled,
    }))

    this.setState({ todos: toggledTodos })
  }

  handleTodoClick(todo, index) {
    const { completed } = todo
    const [...todos] = this.state.todos
    todos[index] = {
      ...todo,
      completed: !completed,
    }
    this.setState({ todos })
  }

  handleInputChange = event => {
    const value = event.target.value
    this.setState({ newTodo: value })
  }

  handleNewTodoKeyDown = event => {
    if (this.state.todos.length >= 10) {
      // don't allow more than 10 todos
      return
    }

    if (event.keyCode !== 13) {
      // 13 is enter key
      return
    }
    event.preventDefault()

    const { newTodo, todos } = this.state
    const value = newTodo.trim()
    if (value) {
      fetch('/todos', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: value,
          completed: false,
        }),
      })
        .then(this.fetchTodos)
        .then(() => this.setState({ newTodo: '' }))
    }
  }

  handleDelete = id => {
    fetch(`/todos/${id}`, {
      method: 'DELETE',
      headers,
    }).then(this.fetchTodos)
  }

  handleClearCompleted = () => {
    const { todos } = this.state
    const completedTodos = todos.filter(
      todo => todo.completed,
    )

    Promise.all(
      completedTodos.map(todo =>
        fetch(`/todos/${todo.id}`, {
          method: 'DELETE',
          headers,
        }),
      ),
    ).then(this.fetchTodos)
  }

  render() {
    const { todos, newTodo } = this.state
    const allToggled = todos.every(todo => todo.completed)
    return (
      <div className="todo-container">
        <input
          id="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.newTodo}
          onChange={this.handleInputChange}
          onKeyDown={this.handleNewTodoKeyDown}
        />
        <label
          htmlFor="new-todo"
          style={{ display: 'none' }}
        >
          New Todo
        </label>
        {todos.length === 0 ? (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  You have nothing to do!
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Checkbox
                    checked={allToggled}
                    onChange={this.handleToggleAll}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.todos.map((todo, i) => (
                <TodoItem
                  key={i}
                  todo={todo}
                  handleToggle={() =>
                    this.handleTodoClick(todo, i)
                  }
                  handleDelete={() =>
                    this.handleDelete(todo.id)
                  }
                />
              ))}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Button
                    size="small"
                    onClick={this.handleClearCompleted}
                  >
                    Clear Completed
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
      </div>
    )
  }
}

export default TodoApp
