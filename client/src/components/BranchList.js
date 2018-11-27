import React, { Component } from "react";
import { Collection, CollectionItem, Button, Modal } from "react-materialize";
import data from '../fakeData.json';
import ChangeForm from './ChangeForm';

class BranchList extends Component {
  constructor(props) {
    super(props);
    let branchList = data['features'].map((feat) => {
      return(feat['name']);
    });
    console.log(branchList);
    this.state = {
      projectName: data['projectName'],
      branchList: branchList
    };
  }

  handleClick = (event) => {
    // e.preventDefault();
    console.log(event);
    // this.setState({ branchList: event });
  }

  onChangeFeature = (e) => {
    e.preventDefault();
    console.log(e.target.index)
    let a = this.state.branchList.slice();
    a[0] = e.target.elements.FeatureName.value;
    this.setState({branchList: a});
    console.log(this.state.branchList);
  }
  
  render() {
    return(
      <div>
        <h2>{this.state.branchList.length}</h2> 
        <h4>features are in progress...</h4>
        <Collection className="branch-track-list">
          {this.state.branchList.map((branch, i) => {
            return(
              // <CollectionItem index={i} key={i}>{branch}</CollectionItem>
              <CollectionItem >
                <a onClick = {() => this.handleClick(branch)} index={i} key={i}>{branch}</a>
                <Button floating className='red' waves='light' icon='delete' 
                    onClick={() => {
                        this.setState(state => ({
                            branchList: state.branchList.filter(branchList => branchList !== branch)
                            }));
                    }}
                    >
                    &times;
                </Button>
                <Modal header='Edit Branch' trigger={<Button floating className='blue' waves='light' icon='edit'>Edit</Button>}>
                  <ChangeForm onChangeFeature={this.onChangeFeature} index={i} />
                </Modal>
              </CollectionItem>
            );
          })}
        </Collection>
      </div>
    );
  }
}

export default BranchList;