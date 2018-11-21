import React, { Component } from "react";
import { Collection, CollectionItem, Button, Modal } from "react-materialize";
import data from "../fakeData.json";
import ChangeForm from "./ChangeForm";
import { Grid, List, ListItem, ListSubheader } from "@material-ui/core";

import BranchListItem from "./BranchListItem";

class BranchList extends Component {
  constructor(props) {
    super(props);
    let branchList = data["features"].map(feat => {
      return feat["name"];
    });
    console.log(branchList);
    this.state = {
      projectName: data["projectName"],
      branchList: branchList
    };
  }

  handleClick = event => {
    // e.preventDefault();
    console.log(event);
    // this.setState({ branchList: event });
  };

  onChangeFeature = e => {
    e.preventDefault();
    console.log(e.target.index);
    let a = this.state.branchList.slice();
    a[0] = e.target.elements.FeatureName.value;
    this.setState({ branchList: a });
    console.log(this.state.branchList);
  };

  render() {
    return (
      <List>
        <ListSubheader>features are in progress</ListSubheader>
        <List className="branchListHover branch-list">
          {this.state.branchList.map((branch, i) => {
            return <BranchListItem branchListItem={branch} key={i} />;
          })}
        </List>
      </List>
    );
  }
}

export default BranchList;

{
  /* <a onClick={() => this.handleClick(branch)} index={i} key={i}>
                  {branch}
                </a>
                <Button
                  floating
                  className="red"
                  waves="light"
                  icon="delete"
                  onClick={() => {
                    this.setState(state => ({
                      branchList: state.branchList.filter(
                        branchList => branchList !== branch
                      )
                    }));
                  }}
                >
                  &times;
                </Button>
                <Modal
                  header="Edit Branch"
                  trigger={
                    <Button floating className="blue" waves="light" icon="edit">
                      Edit
                    </Button>
                  }
                >
                  <ChangeForm
                    onChangeFeature={this.onChangeFeature}
                    index={i}
                  />
                </Modal> */
}
