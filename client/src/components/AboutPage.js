import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Avatar,
  AppBar,
  Toolbar,
  SvgIcon
} from "@material-ui/core";
import OnTrackIcon from "../Assets/images/logo-white.png";

export default class AboutPage extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link className="navLogo" to="/">
              <img className="navLogoIcon" src={OnTrackIcon} alt="track logo" />
            </Link>
          </Toolbar>
        </AppBar>
        <Grid
          container
          justify="center"
          alignItems="center"
          className="aboutPageTitle"
        >
          <h1>About Three.js</h1>
        </Grid>
        <Grid container justify="space-evenly">
          <Grid item md={3} sm={3} lg={3}>
            <Card>
              <CardActionArea>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="Jason"
                    src={require("../Assets/images/Jason.jpeg")}
                    className="avatar"
                  />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <h2>Jianming Kang</h2>
                </Grid>
                <CardMedia
                  title="Contemplative Reptile"
                  image={require("../Assets/images/JasonQR.jpeg")}
                  className="media-picture"
                />
                <CardContent>
                  <p>Brooklyn College</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item md={3} sm={3} lg={3}>
            <Card>
              <CardActionArea>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="Joey"
                    src={require("../Assets/images/Joey.jpeg")}
                    className="avatar"
                  />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <h2>Joey Ching</h2>
                </Grid>
                <CardMedia
                  title="Contemplative Reptile"
                  image={require("../Assets/images/JoeyQR.png")}
                  className="media-picture"
                />
                <CardContent>
                  <p>Brooklyn College</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item md={3} sm={3} lg={3}>
            <Card>
              <CardActionArea>
                <Grid container justify="center" alignItems="center">
                  <Avatar
                    alt="Joe"
                    src={require("../Assets/images/Joe.jpeg")}
                    className="avatar"
                  />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <h2>Joe Lin</h2>
                </Grid>
                <CardMedia
                  title="Contemplative Reptile"
                  image={require("../Assets/images/JoeQR.jpeg")}
                  className="media-picture"
                />
                <CardContent>
                  <p>Brooklyn College</p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
