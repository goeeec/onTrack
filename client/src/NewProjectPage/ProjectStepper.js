import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  Button
} from '@material-ui/core';
import ProjectForm from './ProjectForm';
import MemberList from './MemberList';

const Confirmation = () => <h2>Confirmation</h2>
const SuccessPage = () => <h2>Success!</h2>

function getSteps() {
  return [
    'Project details',
    'Add members',
    'Confirmation',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ProjectForm />;
    case 1:
      return <MemberList />;
    case 2:
      return <Confirmation />;
    default:
      return 'Unknown step';
  }
}


class ProjectStepper extends Component {
  state = {
    activeStep: 0
  };

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
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <SuccessPage />
          ) : (
            <div>
              {getStepContent(activeStep)}
              <Button disabled={activeStep === 0} onClick={this.handleBack}>Back</Button>
              <Button color="primary" onClick={this.handleNext}>{this.state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProjectStepper;