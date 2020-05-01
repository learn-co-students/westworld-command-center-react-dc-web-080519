import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {


  return (
    <Segment id="map" >
      {props.areas.map(area => {
        return <Area {...area}
          hosts={props.hosts.filter(host => (host.area === area.name && host.active === true))}
          key={area.id}
          handleClick={props.handleClick}
          selectedHost={props.selectedHost}
        />
      })}
    </Segment>
  )
}

export default WestworldMap
