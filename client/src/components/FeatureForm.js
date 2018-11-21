import React, { Component } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  Modal,
  Button,
  Typography,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    featureName: "",
    description: ""
  };

  handleFeatureName = e => {
    this.setState({ featureName: e.target.value });
  };

  handleDescription = e => {
    this.setState({ description: e.target.value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title">New Feature</Typography>
            <FormControl>
              <InputLabel htmlFor="featureName">Feature Name</InputLabel>
              <Input
                value={this.state.featureName}
                onChange={this.handleFeatureName}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                value={this.state.description}
                onChange={this.handleDescription}
              />
            </FormControl>
            <TextField
              id="multiline-static"
              label="description"
              multiline
              rows="4"
              defaultValue="Default Value"
              margin="normal"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
