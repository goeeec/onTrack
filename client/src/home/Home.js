import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h2>This is home page</h2>
        <Link to="/dashboard">dashboard</Link>
      </div>
    );
  }
}
