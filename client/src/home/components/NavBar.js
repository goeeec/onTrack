import React, { Component } from "react";
import "../../Assets/css/navbar.css";
import TrackIcon from "../../Assets/images/track.png";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link className="navLogo" to="/">
            <img className="navLogoIcon" src={TrackIcon} alt="track logo" />
            <h4 className="navLogoTitle">onTrack</h4>
          </Link>
          <div className="nav-item">
            <Link to="/Signup">Sign Up</Link>
            <Link to="/SignIn">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }
}
