import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {
  return(
    <Card
      className="host"

      onClick={() => {props.handleClick(props.host)}}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host


/* The className "host selected" renders a different style than simply "host". */
/* On Click what? */
