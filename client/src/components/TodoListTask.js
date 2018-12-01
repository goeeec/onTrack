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
  state = { expanded: null };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <ExpansionPanel
          expanded={expanded === this.props.subtask.name}
          onChange={this.handleChange(this.props.subtask.name)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            {this.props.subtask.name}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>test</ExpansionPanelDetails>
        </ExpansionPanel>
        {/* <ListItem>
          <ListItemText>{this.props.subtask.name}</ListItemText>
        </ListItem> */}
      </div>
    );
  }
}

export default TodoListTask;
