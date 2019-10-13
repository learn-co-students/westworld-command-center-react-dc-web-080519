import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  const returnClassName = () => {
    if (props.selectedHost === null){
      return "host"
    }
    else if (props.selectedHost.id === props.host.id){
      return "host selected"
    }
    else {
      return "host"
    }
  }
  return(
      <Card
      className={returnClassName()}
      onClick={() => {props.handleClick(props.host)}}
      image={props.host.imageUrl}
      raised
      />
  )
}

export default Host


/* The className "host selected" renders a different style than simply "host". */
/* On Click what? */
