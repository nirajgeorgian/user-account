import React, { Component } from 'react'
import ReactDOM from 'react-dom'


// custom importing
import { _Login } from './components/_login'

class App extends Component {
  render() {
    return (
      <div>
        <_Login />
      </div>
    )
  }
}

export default App
