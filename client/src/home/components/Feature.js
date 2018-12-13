import React, { Component } from "react";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";

export default class Feature extends Component {
  render() {
    return (
      <Grid container justify="space-evenly" className="little-dashboard">
        <Grid item sm={5} md={5} lg={5}>
          <Card className="feature-card">
            <img
              src={require("../../Assets/images/daily_updates.jpg")}
              alt="daily status updates"
              className="media-picture "
            />
            <CardHeader title="Daily Status updates" />
            <CardContent>
              Everybody on the team get notifications either in the app or via
              email.
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={5} md={5} lg={5}>
          <Card className="feature-card">
            <img
              src={require("../../Assets/images/done.jpg")}
              alt="daily status updates"
              className="media-picture "
            />
            <CardHeader title="Get things done" />
            <CardContent>
              Always know what's done, what's getting done, and what can't be
              completed.
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item sm={5} md={5} lg={5}>
          <Card className="feature-card">
            <img
              src={require("../../Assets/images/daily_updates.jpg")}
              alt="daily status updates"
              className="media-picture "
            />
            <CardHeader title="Daily Status updates" />
            <CardContent>
              Everybody on the team get notifications either in the app or via
              email.
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={5} md={5} lg={5}>
          <Card className="feature-card">
            <img
              src={require("../../Assets/images/daily_updates.jpg")}
              alt="daily status updates"
              className="media-picture "
            />
            <CardHeader title="Daily Status updates" />
            <CardContent>
              Everybody on the team get notifications either in the app or via
              email.
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    );
  }
}
