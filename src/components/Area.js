import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => {
  // console.log(props)

  const formatName = (name) => {
      let newName = name.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1))
      return newName.join(" ");
  }


  return(
    <div className='area' id={props.name}>
      <h3 className='labels'>{formatName(props.name)}</h3>
      <HostList hosts={props.hosts}/>
      {/* See Checkpoint 1 item 2 in the Readme for a clue as to what goes here */}

    </div>
  )

}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
