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
      currentUsername: "",
      isLogged: false
    };
  }

  /**
   * This will fire before render
   * It will make a fetch call to the backend
   * check if there is a user in the session
   *
   */
  componentWillMount() {
    if (!getFromStorage("userId")) {
      this.setState({ isLogged: false });
    }
    axios.get("/auth/user_detail").then(response => {
      console.log(response.data.passport);
      if (response.data.passport) {
        const userId = response.data.passport.user;
        setInStorage("userId", userId.id);
        this.setState({ isLogged: true });
      }
    });
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.location);
    this.setState({ isLogged: newProps.location.state.isLogged });
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/Signin" component={SigninPage} />
      </div>
    );
  }
}

export default withRouter(App);
