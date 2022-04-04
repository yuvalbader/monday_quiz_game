import React, { Component, useState } from "react"
import "./App.css"
import LandingPage from '../src/components/LandingPage'
import QuizPage from "./components/QuizPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import GameOverPage from "./components/GameOverPage";
import { UserProvider } from "./context/userContext";
import AppContainer from "./components/AppContainer";



class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}



class App extends Component {
  render() {
return <AppContainer></AppContainer>}
}

export default App
