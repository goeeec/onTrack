import React, { Component } from "react";
import "../../Assets/css/navbar.css";
import TrackIcon from "../../Assets/images/track.png";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";

export default class NavBar extends Component {
  render() {
    return (
      <Grid className="navbar">
        <Link className="navLogo" to="/">
          <img className="navLogoIcon" src={TrackIcon} alt="track logo" />
          <h4 className="navLogoTitle">onTrack</h4>
        </Link>
        <div className="nav_item">
          {/* <Link to="/Signup">Sign Up</Link> */}
          <Link to="/SignIn" className="link_button">
            <Button variant="outlined">Sign In</Button>
          </Link>

          <Button variant="outlined" className="link_button">
            <a href="/auth/github">Login with Github</a>
          </Button>
        </div>
      </Grid>
    );
  }
}
