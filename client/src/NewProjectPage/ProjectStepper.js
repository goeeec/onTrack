import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  Button
} from '@material-ui/core';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import MemberList from './MemberList';
import Confirmation from './Confirmation';
import SuccessPage from './SuccessPage';

function getSteps() {
  return [
    'Project details',
    'Add members',
    'Confirmation',
  ];
}

class ProjectStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: getSteps(),
      activeStep: 0,
      project: { name: '', description: '', id: '', cloneUrl: '' }
    };
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProjectForm
            updateProjectName={this.updateProjectName}
            updateProjectDescription={this.updateProjectDescription}
            project={this.state.project}
          />
        );
      case 1:
        return <MemberList />;
      case 2:
        return <Confirmation project={this.state.project} />;
      default:
        return 'Unknown step';
    }
  }

  updateProjectName = (name) => {
    this.setState(prevState => ({
      project: { ...prevState.project, name: name }
    }));
  }

  updateProjectDescription = (descr) => {
    this.setState(prevState => ({
      project: { ...prevState.project, description: descr }
    }));
  }
  
  handleSubmit = () => {
    console.log(this.state.project);
    axios.get("/auth/current_user")
      .then(res => {
        console.log(res.data.accessToken);
        return res.data.accessToken;
      })
      .then(token => {
        axios.post("/github/create_project", {
          name: this.state.project.name,
          description: this.state.project.description,
          accessToken: token
        }).then(res => {
          console.log(res);
          this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
            project: { ...prevState.project, id: res.data.id, cloneUrl: res.data.cloneUrl }
          }));
        })
      })
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  render() {
    const { activeStep } = this.state;

    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {this.state.steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === this.state.steps.length ? (
            <SuccessPage project={this.state.project} />
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <Button disabled={activeStep === 0} onClick={this.handleBack}>Back</Button>
              {this.state.activeStep === this.state.steps.length - 1 ? (
                <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
              ) : (
                <Button disabled={!this.state.project.name} color="primary" onClick={this.handleNext}>Next</Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectStepper;