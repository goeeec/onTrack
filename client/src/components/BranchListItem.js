import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core";
import menuIcon from "../Assets/images/menu-vertical.png";
import { observer, inject } from "mobx-react";

const BranchListItem = inject("store")(
  observer(
    class BranchListItem extends Component {
      constructor(props) {
        super(props);
      }

      displayTodoList = () => {
        console.log(this.props.feature);
        console.log(this.props.index);
        console.log(this.props);
        this.props.store.updateFeatureIndex(this.props.index);
      };

      handleMenu = () => {
        console.log(this.props.branchListItem);
        console.log("Menu");
      };

      render() {
        return (
          <ListItem className="List-Item">
            <ListItemText onClick={this.displayTodoList}>
              {this.props.feature.name}
            </ListItemText>
            <ListItemSecondaryAction>
              <img
                src={menuIcon}
                alt="menu icon"
                className="menuIcon"
                onClick={this.handleMenu}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      }
    }
  )
);

export default BranchListItem;
