import React from 'react'
import { Segment, Button } from 'semantic-ui-react';
import { Log } from '../services/Log'

const LogPanel = (props) => {


  return(
    <Segment className="HQComps" id="logPanel">
      <pre>
        {props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
      </pre>

      {props.hosts.filter(host => host.active === false).length > 0 ?
        <Button
          fluid
          color={"red"}
          content={"ACTIVATE ALL"}
          onClick={() => props.toggleAllActivate(true)}
        />
        :
        <Button
          fluid
          color={"green"}
          content={"DECOMMISSION ALL"}
          onClick={() => props.toggleAllActivate(false)}
        />
        }
    </Segment>
  )
}

export default LogPanel

/* Button below is the Activate All/Decommisssion All button */
/* This isn't always going to be the same color...*/
/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */
