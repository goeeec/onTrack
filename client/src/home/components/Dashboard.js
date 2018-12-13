import React, { Component } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Card,
  CardContent
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";

export default class Dashboard extends Component {
  render() {
    return (
      <Grid item sm={5} md={4} lg={3}>
        <Card className="card">
          <h3>Team Progress</h3>
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Single-line item" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
