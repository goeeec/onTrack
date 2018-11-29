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
import Dashboard from "./components/Dashboard";
import Home from "./home/Home";
import SigninPage from "./User/SigninPage";

import axios from "axios";
import { getFromStorage, setInStorage } from "./components/utils/storage";
import queryString from "query-string";

const auth = {
  isAuthenticated: false
  // authenticate(email, password, cb) {
  // },
  // signout(cb) {
  //   this.isAuthenticated = false;
  //   setTimeout(cb, 100);
  // }
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
        getFromStorage("userId") ? (
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
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: ""
    };
  }

  // this will fire before render
  // this will make a fetch to the backend and
  // check if there is a user in the session
  // if there is a user
  /**
   * This will fire before render
   * It will make a fetch call to the backend
   * check if there is a user in the session
   *
   */
  componentDidMount() {
    axios.get("/auth/user_detail").then(response => {
      console.log(response.data.passport);
      if (response.data.passport) {
        const userId = response.data.passport.user;
        setInStorage("userId", userId.id);
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/Signin"
            render={props => <SigninPage {...props} auth={auth} />}
          />

          {/* <p className="App-intro">{this.state.response}</p> */}
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
