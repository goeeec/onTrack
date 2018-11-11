import React, { Component } from "react";
import { Row, Modal, Button, Input } from "react-materialize";

class FeatureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrafted: false,
      newFeature: {}
    };
  }

  addFeature = () => {
    let newFeature = {
      featureName: document.getElementById("featureName").value,
      featureDescription: document.getElementById("featureDescription").value,
      featureAssignee: document.getElementById("featureAssignee").value,
      featureDue: document.getElementById("featureDue").value
    };
    this.setState({
      isDrafted: true,
      newFeature: newFeature
    });
    console.log("new feature object: ");
    console.log(newFeature);
  };

  pushFeature = () => {
    this.props.handleAdd(this.state.newFeature.featureName);
    this.setState({ isDrafted: false, newFeature: {} });
  };

  getConfirmPage = () => {
    return (
      <Modal
        header="Edit details"
        actions={[
          <Button onClick={() => this.setState({ isDrafted: false })}>Edit</Button>,
          <Button onClick={this.pushFeature} modal="close">Submit</Button>
        ]}
      >
        <Row>
          <label>Feature name:</label>
          <p>
            {this.state.newFeature.featureName
              ? this.state.newFeature.featureName
              : "Blank"}
          </p>
          <label>Description:</label>
          <p>
            {this.state.newFeature.featureDescription
              ? this.state.newFeature.featureDescription
              : "Blank"}
          </p>
          <label>Assignee:</label>
          <p>{this.state.newFeature.featureAssignee}</p>
          <label>DueDate:</label>
          <p>
            {this.state.newFeature.featureDue
              ? this.state.newFeature.featureDue
              : "Blank"}
          </p>
        </Row>
      </Modal>
    );
  };

  getForm = () => {
    return (
      <Modal
        header="New Feature"
        modalOptions={{dismissible: false}}
        trigger={<Button>New Feature</Button>}
        fixedFooter={true}
        actions={[
          <Button onClick={this.addFeature}>Continue</Button>, 
          <Button className="btn-flat" onClick={this.clearForm} modal="close">Close</Button>
        ]}
      >
        <Row>
          <Input s={12} id="featureName" label="Feature name" defaultValue={this.state.newFeature.featureName ? this.state.newFeature.featureName : ''} />
          <Input s={12} id="featureDescription" label="Description" defaultValue={this.state.newFeature.featureDescription ? this.state.newFeature.featureDescription : ''} />
          <Input s={12} id="featureAssignee" type="select" label="Assign to">
            <option value="1">Jason</option>
            <option value="2">Joe</option>
            <option value="3">Joey</option>
          </Input>
          <Input s={12} id="featureDue" type="date" label="Due date" />
        </Row>
      </Modal>
    );
  };

  clearForm = () => {
    document.getElementById("featureName").value = "";
    document.getElementById("featureDescription").value = "";
    document.getElementById("featureAssignee").value = 1;
  }

  render() {
    if (this.state.isDrafted === true) {
      return(this.getConfirmPage());
    } else {
      return(this.getForm());
    }
  }
}

export default FeatureForm;
