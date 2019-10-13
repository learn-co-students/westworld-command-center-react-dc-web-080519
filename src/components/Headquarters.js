import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.


  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage
            hosts={this.props.hosts}
            handleClick={this.props.handleClick}
            selectedHost={this.props.selectedHost}
            />
        {/* Something goes here.... */}

        </Grid.Column>
        <Grid.Column width={5}>
          <Details selectedHost={this.props.selectedHost}
            areas={this.props.areas}
            toggleHost={this.props.toggleHost}
            changeHostArea={this.props.changeHostArea}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            hosts={this.props.hosts}
            toggleAllActivate={this.props.toggleAllActivate}
          />
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}

        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
