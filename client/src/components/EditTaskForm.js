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
  Fab,
  Icon
} from "@material-ui/core";

import { observer, inject } from "mobx-react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const EditTaskForm = inject("store")(
  observer(
    class EditTaskForm extends Component {
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

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
      };

      render() {
        return (
          <div>
            <Fab
              color="inherit"
              size="small"
              aria-label="Edit"
              onClick={this.handleClickOpen}
            >
              <Icon>edit_icon</Icon>
            </Fab>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Feature</DialogTitle>
              <form>
                <DialogContent>
                  <FormControl fullWidth required>
                    <InputLabel htmlFor="featureName" focused required>
                      Edit Task
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
                  <Button
                    onClick={this.handleSubmit}
                    type="submit"
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        );
      }
    }
  )
);

export default EditTaskForm;
