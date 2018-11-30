import React, { Component } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Select,
  MenuItem
} from "@material-ui/core";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class FeatureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      featureName: "",
      featureDescription: "",
      assignTo: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { featureName, featureDescription, assignTo } = this.state;
    if (featureName && featureDescription && assignTo) {
      console.log(featureName, featureDescription, assignTo);
      this.props.newFeature(featureName);
      this.setState({
        featureName: "",
        featureDescription: "",
        assignTo: ""
      });
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>New Feature</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Feature</DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <FormControl fullWidth required>
                <InputLabel htmlFor="featureName" focused required>
                  Feature Name
                </InputLabel>
                <Input
                  fullWidth
                  required
                  id="featureName"
                  placeholder="Feature Name"
                  onChange={this.handleChange("featureName")}
                  value={this.state.featureName}
                />
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel htmlFor="featureDescription" focused required>
                  Description
                </InputLabel>
                <Input
                  fullWidth
                  required
                  id="featureDescription"
                  placeholder="Feature Name"
                  onChange={this.handleChange("featureDescription")}
                  value={this.state.featureDescription}
                />
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel htmlFor="assignTo">Assign To</InputLabel>
                <Select
                  value={this.state.assignTo}
                  onChange={this.handleChange("assignTo")}
                  name="Assign To"
                  displayEmpty
                  required
                >
                  <MenuItem value={"Joe"}>Joe</MenuItem>
                  <MenuItem value={"Joey"}>Joey</MenuItem>
                  <MenuItem value={"Jason"}>Jason</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default FeatureForm;
