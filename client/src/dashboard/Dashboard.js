import React, { Component } from "react";
import { Row, Col } from "react-materialize";
import SideBarIcon from "../images/sideBarIcon.png";
import closeIcon from "../images/X.png";

// import "../App.css";

import ProjectPanel from "./ProjectPanel";
import BranchPanel from "./BranchPanel";
import SideBar from "./SideBar";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isSideBarOpen: false
    };
  }

  handleSideBar = () => {
    this.setState({ isSideBarOpen: !this.state.isSideBarOpen }, () =>
      console.log(this.state.isSideBarOpen)
    );
  };

  render() {
    return (
      <div className="project-panel">
        <Row>
          {this.state.isSideBarOpen ? (
            <Col s={2} m={2} l={2} className="grid side-bar">
              <img
                className="closeIcon"
                src={closeIcon}
                alt="closeIcon"
                onClick={this.handleSideBar}
              />
              <SideBar />
            </Col>
          ) : (
            <Col className="grid closedSideBar slideIn">
              <img
                className="sideBarIcon"
                src={SideBarIcon}
                alt="sideBarOpenIcon"
                onClick={this.handleSideBar}
              />
            </Col>
          )}

          <Col
            s={this.state.isSideBarOpen ? 10 : 11}
            m={this.state.isSideBarOpen ? 10 : 11}
            l={this.state.isSideBarOpen ? 10 : 11}
          >
            <Row>
              <Col s={3} m={3} l={3} className="grid projectPanel">
                <ProjectPanel />
              </Col>
              <Col s={7} m={7} l={7} className="grid branchPanel">
                <BranchPanel />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
