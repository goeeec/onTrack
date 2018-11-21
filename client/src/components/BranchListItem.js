import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from "@material-ui/core";
import menuIcon from "../Assets/images/menu-vertical.png";

export default class BranchListItem extends Component {
  constructor(props) {
    super(props);
  }

  printItemName = () => {
    console.log(this.props.branchListItem);
  };

  render() {
    return (
      <ListItem>
        <ListItemText onClick={this.printItemName}>
          {this.props.branchListItem}
        </ListItemText>
        <ListItemSecondaryAction>
          <img src={menuIcon} alt="menu icon" className="menuIcon" />
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
