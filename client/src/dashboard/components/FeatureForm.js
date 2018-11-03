import React, { Component } from "react";
import { Row, Modal, Button, Input } from "react-materialize";

class FeatureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrafted: false
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
    this.setState({ isDrafted: false });
    // TODO: close the modal
  };

  getConfirmPage = () => {
    return (
      <div>
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
        <Row>
          {/* TODO: save the filled details and go back */}
          <Button
            onClick={() => {
              this.setState({ isDrafted: false });
            }}
          >
            Edit
          </Button>
          <Button onClick={this.pushFeature}>Submit</Button>
        </Row>
      </div>
    );
  };

  getForm = () => {
    return (
      <div>
        <Row>
          <Input s={12} id="featureName" label="Feature name" />
          <Input s={12} id="featureDescription" label="Description" />
          <Input s={12} id="featureAssignee" type="select" label="Assign to">
            <option value="1">Jason</option>
            <option value="2">Joe</option>
            <option value="3">Joey</option>
          </Input>
          <Input s={12} id="featureDue" type="date" label="Due date" />
        </Row>
        <Row>
          <Button onClick={this.addFeature}>Continue</Button>
        </Row>
      </div>
    );
  };

  render() {
    let content;
    if (this.state.isDrafted === true) {
      content = this.getConfirmPage();
    } else {
      content = this.getForm();
    }
    return (
      <Modal header="New Feature" trigger={<Button>New Feature</Button>}>
        {content}
      </Modal>
    );
  }
}

export default FeatureForm;
