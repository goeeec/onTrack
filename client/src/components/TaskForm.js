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

import { observer, inject } from "mobx-react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const TaskForm = inject("store")(
  observer(
    class FeatureForm extends Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false,
          taskName: "",
          description: "",
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
        const { taskName, description, assignTo } = this.state;
        if (taskName && description && assignTo) {
          console.log(taskName, description, assignTo);
          this.props.newFeature(taskName);
          this.setState({
            taskName: "",
            description: "",
            assignTo: ""
          });
          this.props.store.addFeature({
            name: taskName,
            description: description,
            assignee: assignTo,
            subTasks: []
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
                    <InputLabel htmlFor="taskName" focused required>
                      Feature Name
                    </InputLabel>
                    <Input
                      fullWidth
                      required
                      id="taskName"
                      placeholder="Feature Name"
                      onChange={this.handleChange("taskName")}
                      value={this.state.taskName}
                    />
                  </FormControl>
                  <FormControl fullWidth required>
                    <InputLabel htmlFor="description" focused required>
                      Description
                    </InputLabel>
                    <Input
                      fullWidth
                      required
                      id="description"
                      placeholder="Feature Name"
                      onChange={this.handleChange("description")}
                      value={this.state.description}
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

export default TaskForm;
