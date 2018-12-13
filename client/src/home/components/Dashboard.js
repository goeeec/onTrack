import React, { Component } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Card,
  CardContent,
  Checkbox
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";

export default class Dashboard extends Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    return (
      <Grid item sm={5} md={4} lg={4}>
        <Card className="card">
          <h3>Team Progress</h3>
          <p>on branch: authentication</p>
          <CardContent>
          <List>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Task ${value + 1}`} />
            <ListItemSecondaryAction>
              <span style={{color:'gray'}}>commit e6eebc</span>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
