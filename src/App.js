import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'



class App extends Component {
  constructor() {
    super()
    this.state = {
      areas: [],
      hosts: [],
      selectedHost: null
    }
  }
  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  componentDidMount() {
    fetch("http://localhost:4000/areas")
    .then(response => response.json())
    .then(areasArray => {
      this.setState({
        areas: areasArray})
    })

    fetch("http://localhost:4000/hosts")
    .then(response => response.json())
    .then(hostsArray => {
      this.setState({
        hosts: hostsArray})
    })
  }

  changeHost = (hostObj) => {
    console.log(hostObj)

    this.setState({
      selectedHost: hostObj
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas} hosts={this.state.hosts}/>
        <Headquarters hosts={this.state.hosts} handleClick={this.changeHost}
        selectedHost={this.state.selectedHost}
        areas={this.state.areas}
        />
      </Segment>
    )
  }
}

export default App;
