import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import { Grid, Button } from "@material-ui/core";
import Axios from "axios";
import TrackIcon from "../Assets/images/track.png";
import UserConfirmInfo from "./components/UserConfirmInfo";

export default class Home extends Component {
  render() {
    return (
      <div className="background-img">
        <Grid
          container
          alignItems="center"
          justify="center"
          className="container"
        >
          <Grid item md={10} xs={12}>
            <Navbar />
            <div className="content">
            {/* <h1>MANAGE YOUR PROJECT</h1> */}
            <img className="navLogoIcon" src={TrackIcon} alt="track logo" />
            <br />
            <Link to="/dashboard">
              <Button variant="contained" color="primary">dashboard</Button>
            </Link>
            
            <button onClick={() => {
              Axios.get("/auth/user_detail").then(res => console.log(res))
            }}>Test!</button>
            {/* <UserConfirmInfo /> */}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
