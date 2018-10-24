import React, { Component } from "react";
import { Collection, CollectionItem } from "react-materialize";

class BranchList extends Component {
  render() {
    return(
      <div>
        <h2>{this.props.branchList.length}</h2> 
        <h4>features are in progress...</h4>
        <Collection>
          {this.props.branchList.map((branch, i) => {
            return(
              <CollectionItem index={i} key={i}>{branch}</CollectionItem>
            );
          })}
        </Collection>
      </div>
    );
  }
}

export default BranchList;
