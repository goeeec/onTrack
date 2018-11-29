import React, { Component } from "react";
import "../../Assets/css/navbar.css";
import TrackIcon from "../../Assets/images/track.png";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import { removeFromStorage } from "../../components/utils/storage";
export default class NavBar extends Component {
  logout = () => {
    axios.get("/auth/logout").then(res => {
      if (res.status === 200) {
        console.log("logout ");
        removeFromStorage("userId");
      }
    });
  };

  render() {
    return (
      <Grid className="navbar">
        <Link className="navLogo" to="/">
          <img className="navLogoIcon" src={TrackIcon} alt="track logo" />
          <h4 className="navLogoTitle">onTrack</h4>
        </Link>
        <div className="nav_item">
          <Button variant="outlined" className="link_button">
            <a href="/auth/github">Login with Github</a>
          </Button>
          <Button
            variant="outlined"
            className="link_button"
            onClick={this.logout}
          >
            Login Out
          </Button>
        </div>
      </Grid>
    );
  }
}
