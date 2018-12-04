import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import "typeface-roboto";
import data from "../fakeData.json";
import axios from "axios";

import ProjectPanel from "./ProjectPanel";
import BranchPanel from "./BranchPanel";

import { observer, inject } from "mobx-react";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const Dashboard = inject("store")(
  observer(
    class Dashboard extends Component {
      constructor() {
        super();
        this.state = {
          open: false,
          username: "",
          isLoading: true
        };
      }

      componentWillMount = () => {
        this.props.store.initData("151493939");
      }

      handleDrawerOpen = () => {
        this.setState({ open: true });
      };

      handleDrawerClose = () => {
        this.setState({ open: false });
      };

      render() {
        const { classes, theme } = this.props;
        const { open } = this.state;

        if (this.props.store.isLoading) {
          return (
            <Grid container justify="center" alignItems="center">
              <Grid item md={12} lg={12} sm={12}>
                <CircularProgress size={100} thickness={3.6} />
              </Grid>
            </Grid>
          );
        } else {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    open && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                {/* <Typography variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography> */}
                <h4>DashBoard</h4>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{ paper: classes.drawerPaper }}
            >
              <div className={classes.drawerHeader}>
                {/* SideBar */}
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <h3>{this.state.username}</h3>
              <Button variant="contained" href="/" color="primary">
                Home
              </Button>

              <Divider />
              <Divider />
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
              {/* Main Content */}
              <div className={classes.drawerHeader} />
              <Grid container justify="space-around" spacing={40}>
                <Grid item sm={12} md={12} lg={12} xs={12} className="header">
                  {this.props.store.projectName}
                </Grid>
                <ProjectPanel />
                <BranchPanel />
              </Grid>
            </main>
          </div>
        )};
      }
    }
  )
);
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
