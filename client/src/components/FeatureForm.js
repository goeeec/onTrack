import React, { Component } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";
import "../Assets/css/featureForm.css";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
class FeatureForm extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    // this.setState({ open: false });
  };
  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>New Feature</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">New Feature</DialogTitle>
          <form onSubmit={this.handleSubmit}>
            <DialogContent>
              <FormControl fullWidth>
                {/* <TextField
                autoFocus
                margin="dense"
                id="featureName"
                label="Feature Name"
                fullWidth
                required
              />
              <TextField
                id="featureDescription"
                label="Description"
                multiline
                rowsMax="4"
                margin="normal"
                fullWidth
                required
              /> */}
                <InputLabel htmlFor="featureName" focused required>
                  Feature Name
                </InputLabel>
                <Input
                  fullWidth
                  required
                  id="featureName"
                  placeholder="Feature Name"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="test" focused required>
                  test
                </InputLabel>
                <Input
                  fullWidth
                  required
                  id="test"
                  placeholder="Feature Name"
                />
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
