import React, { Component } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListSubheader,
  ListItemText
} from '@material-ui/core';

class Confirmation extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item lg={5} md={5} sm={5}>
          <List>
            <ListSubheader>Confirm your details</ListSubheader>
            <ListItem><ListItemText>Project name: {this.props.project.name}</ListItemText></ListItem>
            {this.props.project.description ? (
              <ListItem>
                <ListItemText>Description: {this.props.project.description}</ListItemText>
              </ListItem>
            ) : ''}
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default Confirmation;