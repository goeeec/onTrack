import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  Redirect
} from "react-router-dom";
import "./Assets/css/App.css";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import SigninPage from "./User/SigninPage";
import SignUpPage from "./User/SignUpPage";
import axios from "axios";

const auth = {
  isAuthenticated: false,
  authenticate(email, password, cb) {
    axios
      .post("/auth/signin", {
        email: email,
        password: password
      })
      .then(response => {
        console.log("login success");
        this.isAuthenticated = true;
        return response;
      })
      .then(body => {
        console.log(body);
        cb();
      })
      .catch(err => {
        console.log(err);
      });
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(({ history }) =>
  auth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  state = {
    response: ""
  };

  render() {
    return (
      <div className="App">
        {/* <AuthButton /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/Signin"
            render={props => <SigninPage {...props} auth={auth} />}
          />
          <Route exact path="/SignUp" component={SignUpPage} />
        </Switch>

        {/* <p className="App-intro">{this.state.response}</p> */}
      </div>
    );
  }
}

export default withRouter(App);
