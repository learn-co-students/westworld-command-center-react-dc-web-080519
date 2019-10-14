import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'



class App extends Component {
  constructor() {
    super()
    this.state = {
      areas: [],
      hosts: [],
      selectedHost: null,
      logs: []
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

    let newLog = [...this.state.logs]

    if (activeStatus) {
      newLog.unshift(Log.warn(`Activated ${hostObj.firstName}`))
    }
    else {
      newLog.unshift(Log.notify(`Decommissioned ${hostObj.firstName}`))
    }
    this.setState({
      logs: newLog
    })
  }

  changeHostArea = (hostObj, value, formatName) => {
    let limit = this.state.areas.find(area=> area.name === value).limit
    let hostsInArea = this.state.hosts.filter(host => host.area === value)
    let newLog = [...this.state.logs]

    if (hostsInArea.filter(host => host.id === hostObj.id).length === 1) {
      newLog.unshift(Log.notify(`${hostObj.firstName} is already set in area ${formatName}`))
    }
    else if (hostsInArea.length === limit) {
      newLog.unshift(Log.error(`Too many hosts. Cannot add ${hostObj.firstName} to ${formatName}`))
    }
    else {
      let changedHost = this.state.hosts.map(host => {
        return (host.id !== hostObj.id ? host : {...hostObj, area: value})
      })
      this.updateHostAndSelHost(changedHost, hostObj, "area", value)
      newLog.unshift(Log.notify(`${hostObj.firstName} set in area ${formatName}`))
    }
    this.setState({
      logs: newLog
    })


  }

  updateHostAndSelHost = (array, hostObj, key, value) => {
    this.setState({
      hosts: array,
      selectedHost: {...hostObj, [key]: value}
    })
  }

  toggleAllActivate = (activateStatus) => {
    let newArray = this.state.hosts.map(host => {return {...host, active: activateStatus} })
    let newLog = [...this.state.logs]

    if (this.state.selectedHost) {
      this.setState({
        selectedHost: {...this.state.selectedHost, active: activateStatus}
      })
    }
    this.setState({
      hosts: newArray
    })

    if (activateStatus) {
      newLog.unshift(Log.warn("Activating all hosts!"))
    }
    else {
      newLog.unshift(Log.notify("Decommissioning all hosts."))
    }

    this.setState({
      logs: newLog
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
          logs={this.state.logs}
        />
      </Segment>
    )
  }
}

export default App;
