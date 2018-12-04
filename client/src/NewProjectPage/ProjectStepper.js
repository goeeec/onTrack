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
import ResultPage from './ResultPage';

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
      project: { name: '', description: '', id: '', cloneUrl: '', owner: {} },
      error: []
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
    axios.get("/auth/current_user")
      .then(res => res.data.accessToken)
      .then(token => {
        axios.post("/github/create_project", {
          name: this.state.project.name,
          description: this.state.project.description,
          accessToken: token
        }).then(res => {
          console.log(res);
          // if the repo is successfully created
          // update the project state
          if (res.status === 201) {
            this.setState(prevState => ({
              activeStep: prevState.activeStep + 1,
              project: { ...prevState.project, id: res.data.id + '', cloneUrl: res.data.cloneUrl, owner: res.data.owner }
            }));
            this.saveProjectToDatabase();
          } else {
            this.setState(prevState => ({
              activeStep: prevState.activeStep + 1,
              error: res.data.error.errors.map(err => {
                return ({ source: err.resource, message: err.message });
              })
            }))
          }
        }).then(() => console.log('after posting: ', this.state.project))
        .catch(err => {
          console.log(err);
        })
      })
  }

  saveProjectToDatabase = () => {
    axios.post("/api/project", {
      projectId: this.state.project.id,
      name: this.state.project.name,
      cloneUrl: this.state.project.cloneUrl,
      owner: this.state.project.owner.username,
      description: this.state.project.description,
      branches: []
    }).then(res => console.log(res)).catch(err => console.log(err))
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

  handleReset = () =>{
    this.setState(state => ({
      activeStep: 0,
      project: { name: '', description: '', id: '', cloneUrl: '' },
      error: []
    }));
  }

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
            <ResultPage project={this.state.project} error={this.state.error} handleReset={this.handleReset} />
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