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

// function PrivateRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         auth.isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/Signin",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
    this.state = {
      currentUsername: "",
      isAuthenticated: false
    };
  }

  componentDidMount() {
    axios.get("/auth/user_detail").then(response => {
      console.log(response.data.passport);
      if (response.data.passport) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  }
  checkAuth = () => {
    axios.get("/auth/user_detail").then(response => {
      console.log(response.data.passport);
      if (response.data.passport) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    });
  };

  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          this.state.isAuthenticated ? (
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
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/Signin"
            render={props => <SigninPage {...props} auth={auth} />}
          />
        </Switch>

        {/* <p className="App-intro">{this.state.response}</p> */}
      </div>
    );
  }
}

export default withRouter(App);
