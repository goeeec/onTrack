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
      //members: []
    };
  }

  handleAdd = () => {
    this.props.addMember(document.getElementById("new_member").value);
    this.setState({
      // members: [
      //   ...this.state.members,
      //   document.getElementById("new_member").value
      // ],
      isEditing: false
    });
  };

  // TODO: fix this delete handler
  handleDelete = e => {
    console.log(e.target);
    // this.setState({
    //   members: this.state.members.filter(member => {
    //     return member !== e.target.value;
    //   })
    // });
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
      <Grid container justify="center" style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item lg={12} md={12} sm={12}>
          <List>
            <ListSubheader>Enter Github users you want to add...</ListSubheader>
            {this.props.members.map(user => {
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  style={{ display: 'flex', justifyContent: 'center' }}
                  onClick={() => {
                    this.setState({ isEditing: true });
                  }}
                >
                  Add new member
            </Button>
              )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default MemberList;
