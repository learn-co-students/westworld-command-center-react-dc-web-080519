import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'

const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)

  const formatName = (name) => {
      let newName = name.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1))
      return newName.join(" ");
  }

  const areaOptionsFormat= () => {
    let areaOptions = props.areas.map(area => {
      return {key: area.name,
        text: formatName(area.name),
        value: area.name
        }
      })

    return areaOptions.sort((a,b) => {
      if(a.text < b.text) {
        return -1;
      }
      if(a.text > b.text) {
        return 1;
      }
    })

  }

  return(
    <Segment id="details" className="HQComps">
      {props.selectedHost === null ? renderSomething() :
      <HostInfo selectedHost={props.selectedHost}
        areaOptions={areaOptionsFormat()}
        toggleHost={props.toggleHost}
        changeHostArea={props.changeHostArea}
        />}
    </Segment>
  )
}

export default Details
