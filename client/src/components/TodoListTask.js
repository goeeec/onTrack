import React, { Component } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
  Checkbox,
  List,
  ListItem,
  ListSubheader,
  ListItemText
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import EditTaskForm from "./EditTaskForm";
import { observer, inject } from "mobx-react";

const TodoListTask = inject("store")(
  observer(
    class TodoListTask extends Component {
      state = {
        expanded: null
      };

      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false
        });
      };
      handleClick = event => {
        event.stopPropagation();
        this.props.store.handleChecked(this.props.subtask.name);
      };

      render() {
        const { expanded } = this.state;
        return (
          <ExpansionPanel
            expanded={expanded === this.props.subtask.name}
            onChange={this.handleChange(this.props.subtask.name)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Checkbox
                checked={this.props.subtask.isCompleted}
                onClick={this.handleClick}
              />
              <p className="align-items-center">{this.props.subtask.name}</p>
            </ExpansionPanelSummary>
            <Divider variant="middle" />
            <ExpansionPanelDetails className="flexbox">
              <div className="flex-left">
                <List>
                  <ListItem>
                    <ListItemText>
                      Description: {this.props.subtask.description}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      Assign To: {this.props.subtask.assignee}
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      Due Date To: {this.props.subtask.dueDate}
                    </ListItemText>
                  </ListItem>
                </List>
              </div>

              <div className="flex-right">
                <EditTaskForm index={this.props.index} />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
    }
  )
);

export default TodoListTask;
