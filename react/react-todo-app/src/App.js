import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

const todos = [
  'Learn React',
  'Learn Redux',
  'Learn React Native',
]

class App extends Component {
  render() {
    return React.createElement(
      'div',
      {
        className: 'app',
      },
      React.createElement(
        'div',
        {
          className: 'todo-container',
        },
        todos.map((todo, index) =>
          React.createElement(
            'div',
            {
              className: 'todo-item-row',
              key: index,
            },
            todo,
          ),
        ),
      ),
    )
  }
}

export default App
