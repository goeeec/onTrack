import React, { Component } from "react";
import data from "../fakeData.json";
import { Grid, List, ListItem, ListSubheader } from "@material-ui/core";

import BranchListItem from "./BranchListItem";

class BranchList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <ListSubheader>features are in progress</ListSubheader>
        <List className="branchListHover branch-list">
          {this.props.branchList.map((branch, i) => {
            return <BranchListItem branchListItem={branch} key={i} index={i} />;
          })}
        </List>
      </List>
    );
  }
}

export default BranchList;
