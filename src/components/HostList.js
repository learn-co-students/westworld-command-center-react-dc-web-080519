import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {
  return(
    <Card.Group itemsPerRow={props.itemsPerRow}>
      {props.hosts.map(host => <Host host={host} key={host.id} handleClick={props.handleClick} />)}
    </Card.Group>
  )
}

export default HostList

// {props.hosts.map(host => <Host host={host}/>)}
