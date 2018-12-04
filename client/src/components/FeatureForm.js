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
  MenuItem,
  Grid
} from "@material-ui/core";
import FeatureStepperForm from "./FeatureStepperForm";

import { observer, inject } from "mobx-react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FeatureForm = inject("store")(
  observer(
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

      handleOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      render() {
        return (
          <Grid item>
            <Button onClick={this.handleOpen}>New Feature</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Feature</DialogTitle>
              <FeatureStepperForm
                handleClose={this.handleClose}
                handleOpen={this.handleOpen}
              />
            </Dialog>
          </Grid>
        );
      }
    }
  )
);

export default FeatureForm;
