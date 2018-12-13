import React, { Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, Slide, } from '@material-ui/core';
import ProjectStepper from './ProjectStepper';
import NavBar from '../home/components/NavBar';


import { observer, inject } from "mobx-react";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const NewProjectPage = inject("store")(
  observer(
    class NewProjectPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
          open: false,
        };
      }

      handleOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };
      render() {
        return (
          <Grid>
            <Button className="dash_button column" color="secondary" variant="outlined" onClick={this.handleOpen}>Create new project</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              TransitionComponent={Transition}
              aria-labelledby="form-dialog-title"
            >
              <Grid container alignItems="stretch" justify="space-around" direction="column">
                <Grid container alignItems="center" justify="space-around" direction="column">
                  <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                  <Grid item md={6} sm={12} lg={6} xm={12} style={{ "width": "50vw" }}>
                    <ProjectStepper
                      handleClose={this.handleClose}
                      handleOpen={this.handleOpen}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Dialog>
          </Grid>

        );
      }
    }
  )
);

export default NewProjectPage;