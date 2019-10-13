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
    this.setState({
      selectedHost: hostObj
    })
  }

  toggleHost = (hostObj, activeStatus) => {

    let activatedHost = this.state.hosts.map(host => {
      return (host.id !== hostObj.id ? host : {...hostObj, active: activeStatus})
    })

    this.updateHostAndSelHost(activatedHost, hostObj, "active", activeStatus)
  }

  changeHostArea = (hostObj, value) => {
    let limit = this.state.areas.find(area=> area.name === value).limit
    if (this.state.hosts.filter(host => host.area === value).length >= limit) {
      alert(`Too many hosts in ${value} the limit is ${limit}`)
    }
    else {
      let changedHost = this.state.hosts.map(host => {
        return (host.id !== hostObj.id ? host : {...hostObj, area: value})
      })
      this.updateHostAndSelHost(changedHost, hostObj, "area", value)
    }
    console.log(limit)

  }

  updateHostAndSelHost = (array, hostObj, key, value) => {
    this.setState({
      hosts: array,
      selectedHost: {...hostObj, [key]: value}
    })
  }

  toggleAllActivate = (activateStatus) => {
    let newArray = this.state.hosts.map(host => {return {...host, active: activateStatus} })
    if (this.state.selectedHost) {
      this.setState({
        selectedHost: {...this.state.selectedHost, active: activateStatus}
      })
    }
    this.setState({
      hosts: newArray
    })
  }


  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas}
          hosts={this.state.hosts}
          handleClick={this.changeHost}
          selectedHost={this.state.selectedHost}
        />

        <Headquarters
          hosts={this.state.hosts}
          handleClick={this.changeHost}
          selectedHost={this.state.selectedHost}
          toggleHost={this.toggleHost}
          areas={this.state.areas}
          changeHostArea={this.changeHostArea}
          toggleAllActivate={this.toggleAllActivate}
        />
      </Segment>
    )
  }
}

export default App;
