import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Grid } from "react-materialize";
import axios from "axios";

export default class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirectToReferrer: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.auth.isAuthenticated);
    this.props.auth.authenticate(this.state.email, this.state.password, () => {
      this.setState({ redirectToReferrer: true });
    });
    // axios
    //   .post("/auth/signin", {
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    //   .then(() => {
    //     console.log("ok");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;
    let { isAuthenticated } = this.props.auth;

    {
      console.log(this.props.auth.isAuthenticated);
    }

    if (redirectToReferrer) return <Redirect to={from} />;
    if (isAuthenticated) return <Redirect to={from} />;
    //test
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
        <Row>
          <a href="/auth/github">Login with Github</a>
        </Row>
      </div>
    );
  }
}
