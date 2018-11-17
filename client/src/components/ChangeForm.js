import React, { Component } from "react";
import { Modal, Input, Row, Button } from "react-materialize";

class ChangeForm extends Component {
    render() {
      console.log(this.props.index)
      return (
          <form onSubmit={this.props.onChangeFeature} index={this.props.index} >
          <Row>
            <Input s={12} name="FeatureName" label="Feature name" />
            <Input s={12} name="Description" label="Description" />
            <Input s={12} name="select" type="select" label="Assign to">
              <option value="1">Jason</option>
              <option value="2">Joe</option>
              <option value="3">Joey</option>
            </Input>
            <Input s={12} type="date" label="Due date" />
          </Row>
          <Row>
            <Button>Submit</Button>
          </Row>
          </form>
      );
    }
  }

export default ChangeForm;