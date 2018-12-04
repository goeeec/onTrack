import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
  Checkbox
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import EditTaskForm from "./EditTaskForm";
import { observer, inject } from "mobx-react";

const TodoListTask = inject("store")(
  observer(
    class TodoListTask extends Component {
      handleClick = () => {
        this.props.store.handleChecked(this.props.subtask.name);
      };

      render() {
        {
          console.log(this.props.subtask);
        }
        return (
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {this.props.subtask.name}
            </ExpansionPanelSummary>
            <Divider variant="middle" />
            <ExpansionPanelDetails className="flexbox">
              <p className="flex-left">
                <Checkbox
                  checked={this.props.subtask.isCompleted}
                  onClick={this.handleClick}
                />
                {this.props.subtask.name}
              </p>
              <div className="flex-right">
                <EditTaskForm />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
    }
  )
);

export default TodoListTask;
