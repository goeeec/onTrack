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
  Icon,
  TextField,
  Tooltip
} from "@material-ui/core";

/**
 * TODO: Add default value to input
 * add mobx:
 *  add a function that update the value
 *  remove task button????
 */
import { observer, inject } from "mobx-react";
import TodoList from "./TodoList";

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
          taskName: "",
          description: "",
          assignTo: "",
          date: ""
        };
      }

      componentWillMount() {
        const task = this.props.store.currentSubTaskDetail(this.props.index);
        this.setState({
          taskName: task.name,
          description: task.description,
          assignTo: task.assignee,
          date: task.dueDate
        });
      }

      handleClickOpen = () => {
        console.log(this.props);
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

      handleSubmit = e => {
        e.preventDefault();
        const { taskName, description, assignTo, date } = this.state;
        if (taskName && description && assignTo && date) {
          console.log(taskName, description, assignTo, date);
          this.setState({
            taskName: "",
            description: "",
            assignTo: "",
            date: ""
          });
          this.props.store.editSubTask(
            {
              name: taskName,
              description: description,
              assignee: assignTo,
              dueDate: date
            },
            this.props.index
          );
          this.setState({ open: false });
        } else {
          this.setState({ open: true });
        }
      };

      handleDelete = e => {
        this.props.store.deleteSubTask(this.props.index);
        this.setState({ open: false });
      };

      render() {
        return (
          <div>
            <Tooltip title="Edit">
              <Fab
                color="inherit"
                size="small"
                aria-label="Edit"
                onClick={this.handleClickOpen}
              >
                <Icon>edit_icon</Icon>
              </Fab>
            </Tooltip>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
              <form onSubmit={this.handleSubmit}>
                <DialogContent>
                  <FormControl fullWidth required>
                    <InputLabel htmlFor="taskName" focused required>
                      Name
                    </InputLabel>
                    <Input
                      fullWidth
                      required
                      id="taskName"
                      placeholder="Feature Name"
                      value={this.state.taskName}
                      onChange={this.handleChange("taskName")}
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
                  <FormControl fullWidth required>
                    <TextField
                      id="date"
                      label="Due Date"
                      type="date"
                      InputLabelProps={
                        { shrink: true } // defaultValue="2018-05-24"
                      }
                      onChange={this.handleChange("date")}
                      value={this.state.date}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleDelete} color="primary">
                    Delete
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
