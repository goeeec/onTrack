import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class ResultPage extends Component {
  renderSuccess = () => {
    return (
      <Grid container alignItems="center" justify="space-around" direction="column" spacing={8}>
        <Grid item lg={8} md={8} sm={8}>
          <h2>Success!</h2>
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          Clone your project: <br />
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          <Paper style={{ padding: '1em 1em' }}>
            <code>git clone {this.props.project.cloneUrl}</code>
          </Paper>
        </Grid>
        <Grid item lg={8} md={8} sm={8}>
          <Link to="/dashboard">Dashboard</Link>
        </Grid>
      </Grid>
    );
  }

  renderFailure = () => {
    return (
      <Grid container alignItems="center" justify="space-around" direction="column" spacing={8}>
        <Grid item lg={8} md={8} sm={8}>
          <h2>Uh-oh...</h2>
        </Grid>
        {this.props.error.map(err => {
          return (
            <Grid item lg={8} md={8} sm={8}>
              {err.source}: {err.message}
            </Grid>
          );
        })}
        <Grid item lg={8} md={8} sm={8}>
          <Button onClick={this.props.handleReset}>Reset</Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (this.props.error.length > 0 ? this.renderFailure() : this.renderSuccess());
  }
}

export default ResultPage;