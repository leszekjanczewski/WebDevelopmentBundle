import React, { Component } from 'react'
import { Table, Checkbox, Button } from 'semantic-ui-react'

import './App.css'

const TodoItem = props => (
  <Table.Row>
    <Table.Cell>
      <Checkbox />
    </Table.Cell>
    <Table.Cell>
      {props.children}
      <Button
        color="red"
        icon="trash"
        floated="right"
        compact
        size="small"
      />
    </Table.Cell>
  </Table.Row>
)

class App extends Component {
  state = {
    todos: [
      { title: 'Learn React', completed: false },
      { title: 'Learn Redux', completed: false },
      { title: 'Learn React Native', completed: false },
      {
        title: 'Create a brand new web app!',
        completed: false,
      },
    ],
    newTodo: '',
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
      return
    }

    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()

    const { newTodo, todos } = this.state //Destructure
    const value = newTodo.trim() //Get rid of white space at beginning and end
    if (value) {
      //Check the value isn't blank
      this.setState({
        todos: [
          ...todos, //Copy the current todos in the array
          { title: value, completed: false }, //Create a new array object
        ],
        newTodo: '', //Clear the input field
      })
    }
  }

  render() {
    return (
      <div className="app">
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
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Checkbox />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.todos.map((todo, i) => (
                <Table.Row
                  key={i}
                  positive={todo.completed}
                >
                  <Table.Cell>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() =>
                        this.handleTodoClick(todo, i)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {todo.title}
                    <Button
                      color="red"
                      icon="trash"
                      floated="right"
                      compact
                      size="small"
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}

export default App
