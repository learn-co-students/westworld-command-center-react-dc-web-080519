import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {



  handleChange = (e, {value}) => {
    this.props.changeHostArea(this.props.selectedHost, value)
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    this.props.toggleHost(this.props.selectedHost, !(this.props.selectedHost.active))
  }



  render(){
    let {imageUrl, firstName, gender, area, active} = this.props.selectedHost

    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {firstName} | { gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
              </Card.Header>
              <Card.Meta>
                {active === true ?
                  <Radio
                    onChange={this.toggle}
                    label={"Active"}
                    checked={true}

                    slider
                  />
                :
                <Radio
                  onChange={this.toggle}
                  label={"Decommissioned"}
                  checked={false}
                  slider
                />}
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={area}
                options={this.props.areaOptions}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo

/* Line 53 Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */

/* Line 55Checked takes a boolean and determines what position the switch is in. Should it always be true? */
