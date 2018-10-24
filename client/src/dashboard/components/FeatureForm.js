import React, { Component } from "react";
import { Row, Modal, Button, Input } from "react-materialize";

class FeatureForm extends Component {
  render() {
    return (
      <Modal header="New Feature" trigger={<Button>New Feature</Button>}>
        <Row>
          <Input s={12} label="Feature name" />
          <Input s={12} label="Description" />
          <Input s={12} type="select" label="Assign to">
            <option value="1">Jason</option>
            <option value="2">Joe</option>
            <option value="3">Joey</option>
          </Input>
          <Input s={12} type="date" label="Due date" />
        </Row>
        <Row>
          <Button>Submit</Button>
        </Row>
      </Modal>
    );
  }
}

export default FeatureForm;
