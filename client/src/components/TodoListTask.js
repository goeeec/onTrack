import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class TodoListTask extends Component {
  render() {
    {
      console.log(this.props.subtask);
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h4>{this.props.subtask.name}</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{this.props.subtask.name}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default TodoListTask;
{
  /* <ExpansionPanel
          expanded={expanded === this.props.subtask.name}
          onChange={this.handleChange(this.props.subtask.name)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {this.props.subtask.name}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>test</ExpansionPanelDetails>
        </ExpansionPanel> */
}
{
  /* <ListItem>
          <ListItemText>{this.props.subtask.name}</ListItemText>
        </ListItem> */
}
