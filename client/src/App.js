import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./Assets/css/App.css";
import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";

class App extends Component {
  state = {
    response: ""
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
        </Switch>

        {/* <p className="App-intro">{this.state.response}</p> */}
      </div>
    );
  }
}

export default withRouter(App);
