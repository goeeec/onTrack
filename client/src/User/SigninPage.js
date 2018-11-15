import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Grid } from "react-materialize";
import axios from "axios";

export default class SigninPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    console.log(this.state);
    axios
      .post("/auth/signin", {
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
        console.log("ok");
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Row>
          <Col s={5} m={5} l={5}>
            <form onSubmit={this.handleSubmit}>
              <label>email:</label>
              <input
                htmlFor="email"
                type="email"
                required
                value={this.state.email}
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
              <label>Password:</label>
              <input
                htmlFor="password"
                type="password"
                minLength={6}
                required
                value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <input type="submit" value="submit" />
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
