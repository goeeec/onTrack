import React, { Component } from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      members: []
    };
  }

  handleAdd = () => {
    this.setState({
      members: [
        ...this.state.members,
        document.getElementById("new_member").value
      ],
      isEditing: false
    });
  };

  // TODO: fix this delete handler
  handleDelete = e => {
    console.log(e.target);
    this.setState({
      members: this.state.members.filter(member => {
        return member !== e.target.value;
      })
    });
  };

  render() {
    let inputBox;
    if (this.state.isEditing) {
      inputBox = (
        <TextField
          id="new_member"
          label="Github username"
          margin="normal"
          type="search"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Button onClick={this.handleAdd}>Add</Button>
              </InputAdornment>
            )
          }}
        />
      );
    }
    return (
      <Grid container justify="center">
        <Grid item lg={5} md={5} sm={5}>
          <List>
            <ListSubheader>Enter Github users you want to add...</ListSubheader>
            {this.state.members.map(user => {
              return (
                <ListItem>
                  <ListItemText>{user}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.handleDelete}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
            {inputBox}
          </List>
          {this.state.isEditing ? (
            <Button
              variant="contained"
              size="medium"
              color="default"
              onClick={() => {
                this.setState({ isEditing: false });
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="contained"
              size="medium"
              color="default"
              onClick={() => {
                this.setState({ isEditing: true });
              }}
            >
              Add new member
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default MemberList;
