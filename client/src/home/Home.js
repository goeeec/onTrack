import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/NavBar";
import "../Assets/css/home.css";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  AppBar,
  Toolbar,
  SvgIcon
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { getFromStorage, removeFromStorage } from "../components/utils/storage";
import axios from "axios";
import { observer } from "mobx-react";
import ExistingProjectPage from "../ExistingProjectPage/ExistingProjectPage";
import OnTrackIcon from "../Assets/images/logo-white.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NewProjectPage from "../NewProjectPage/NewProjectPage";

const GithubIcon = ({
  style = {},
  fill = "#fff",
  width = "100%",
  className = "",
  height = "100%",
  viewBox = "0 0 32 32"
}) => {
  return (
    <SvgIcon
      style={style}
      width={width}
      height={height}
      className={className}
      viewBox={viewBox}
    >
      <path
        fill={fill}
        d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
      />
    </SvgIcon>
  );
};

const Home = observer(
  class Home extends Component {
    state = {
      open: false,
      validUser: false
    };

    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    logout = () => {
      axios.get("/auth/logout").then(res => {
        if (res.status === 200) {
          console.log("logout ");
          removeFromStorage("userId");
          this.props.history.push({
            pathname: "/",
            state: { isLogged: false }
          });
          console.log(this.props.history);
          this.setState({ validUser: false });
        }
      });
    }

    componentWillMount() {
      const id = axios.get("/auth/user_detail").then(response => {
        if (response.data.passport) {
          this.setState({ validUser: true });
        }
      });
    };

    render() {
      return (
        <div>
          <div className="home-img" />
          <Grid
            container
            alignItems="center"
            justify="center"
            className="container"
          >
            <Grid item md={10} xs={12}>
              {/* <div className="nav"><Navbar /></div> */}
              <AppBar position="fixed">
                <Toolbar>
                  <Link className="navLogo" to="/">
                    <img
                      className="navLogoIcon"
                      src={OnTrackIcon}
                      alt="track logo"
                    />
                  </Link>
                  <div className="flex-end">
                    <Button color="inherit" href="/About">
                      <AccountCircle />
                      About
                    </Button>
                    {getFromStorage("userId") ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.logout}
                      >
                        Logout
                      </Button>
                    ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          href="/auth/github"
                          className="flex-item"
                        >
                          <GithubIcon />
                          Login
                      </Button>
                      )}
                  </div>
                </Toolbar>
              </AppBar>
              {this.state.validUser ?
                <div className="content">
                  <h1>Manage your projects</h1>
                  <Button 
                    className="dash_button" 
                    color="secondary" 
                    variant="contained" 
                    component={Link} 
                    to="/dashboard"
                  >
                    dashboard
                  </Button>
                  <br />

                  <div className="row">
                    <NewProjectPage />

                    <br />
                    <Button 
                      className="dash_button column" 
                      color="primary" 
                      variant="outlined" 
                      onClick={this.handleOpen}
                    >
                    Existing Project
                  </Button>
                  </div>
                  <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Existing project</DialogTitle>
                    <DialogContent>
                      <ExistingProjectPage />
                    </DialogContent>
                  </Dialog>
                </div>
                : <div><h1 className="pre-login-title">Welcome to OnTrack</h1>
                  <p className="pre-login-context">Please login with Github</p>
                </div>}
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);

export default Home;
