import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import "./Assets/css/App.css";
import Dashboard from "./components/Dashboard";
import Home from "./home/Home";
import SigninPage from "./User/SigninPage";

import axios from "axios";
import {
  getFromStorage,
  setInStorage,
  removeFromStorage
} from "./components/utils/storage";

import { observer, inject } from "mobx-react";

/**
 * This method accepts a component
 * Checks if the local storage has the user Id
 * True: render the component
 * False: redirect to sign in
 * @param {*Component} param0
 */
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

const App = inject("store")(
  observer(
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
       * True: save the user id in local storage
       * False: Nothing
       */
      componentWillMount() {
        console.log(this.props.store);
        this.props.store.change("lin");
        if (!getFromStorage("userId")) {
          this.setState({ isLogged: false });
        }
        axios.get("/auth/user_detail").then(response => {
          console.log(response.data.passport);
          if (response.data.passport) {
            const userId = response.data.passport.user;
            setInStorage("userId", userId.id);
            this.setState({ isLogged: true });
          } else {
            removeFromStorage("userId");
            this.setState({ isLogged: false });
          }
        });
      }

      /**
       * THIS IS NOT A GOOD PRACTICE
       * This method will wait for newProps
       * if there is newProps.location.state
       * True: change the current state of isLogged
       * which will re-render the page
       * @param {*} newProps
       */
      componentWillReceiveProps(newProps) {
        console.log(newProps.location);
        if (newProps.location.state)
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
  )
);

export default withRouter(App);
