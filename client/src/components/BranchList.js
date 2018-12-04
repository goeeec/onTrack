import React, { Component } from "react";
import data from "../fakeData.json";
import { List, ListSubheader } from "@material-ui/core";

import BranchListItem from "./BranchListItem";
import { observer, inject } from "mobx-react";

const BranchList = inject("store")(
  observer(
    class BranchList extends Component {
      render() {
        return (
          <List>
            <ListSubheader>features are in progress</ListSubheader>
            <List className="branchListHover branch-list">
              {this.props.store.features.map((feature, i) => {
                return <BranchListItem feature={feature} key={i} index={i} />;
              })}
            </List>
          </List>
        );
      }
    }
  )
);

export default BranchList;
