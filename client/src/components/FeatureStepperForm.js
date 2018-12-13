import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  DialogContent,
  DialogActions,
  Step,
  Stepper,
  StepLabel,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Select,
  MenuItem
} from "@material-ui/core";
import { observer, inject } from "mobx-react";
import axios from 'axios';

const styles = theme => ({
  root: {
    maxWidth: 400,
    // height: 300,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4
    // backgroundColor: theme.palette.background.default
  },
  mobileStepper: {
    marginTop: 20,
    backgroundColor: "#ffffff"
  }
});

function getSteps() {
  return ["Feature details", "Confirmation"];
}

const FeatureStepperForm = inject("store")(
  observer(
    class FeatureStepperForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          activeStep: 0,
          featureName: "",
          featureDescription: "",
          baseBranch: "master"
        };
      }

      getStepContent = stepIndex => {
        switch (stepIndex) {
          case 0:
            return (
              <form onSubmit={this.handleSubmit}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="baseBranch">Select base branch</InputLabel>
                  <Select
                    value={this.state.baseBranch}
                    onChange={this.handleChange("baseBranch")}
                    name="Base branch"
                    required
                  >
                    {this.props.store.features.map(feature => (
                      <MenuItem key={feature.name} value={feature.name}>
                        {feature.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="featureName" focused required>
                    Feature Name
                  </InputLabel>
                  <Input
                    required
                    id="featureName"
                    placeholder="Feature Name"
                    onChange={this.handleChange("featureName")}
                    value={this.state.featureName}
                  />
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel htmlFor="featureDescription" focused required>
                    Description
                  </InputLabel>
                  <Input
                    required
                    id="featureDescription"
                    placeholder="Feature Name"
                    onChange={this.handleChange("featureDescription")}
                    value={this.state.featureDescription}
                  />
                </FormControl>
              </form>
            );
          case 1:
            return (
              <List>
                <ListSubheader>Confirm your details</ListSubheader>
                <ListItem>
                  <ListItemText>
                    Base branch: {this.state.baseBranch}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Feature name: {this.state.featureName}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Description: {this.state.featureDescription}
                  </ListItemText>
                </ListItem>
              </List>
            );
          default:
            return "Uknown stepIndex";
        }
      };

      handleNext = () => {
        if (this.state.activeStep !== 1)
          this.setState(prevState => ({
            activeStep: prevState.activeStep + 1
          }));
      };

      handleBack = () => {
        if (this.state.activeStep !== 0)
          this.setState(prevState => ({
            activeStep: prevState.activeStep - 1
          }));
      };

      handleSubmit = e => {
        console.log("IN CREATE");
        e.preventDefault();
        const { featureName, featureDescription, baseBranch } = this.state;
        if (featureName && featureDescription) {
          console.log(featureName, featureDescription, baseBranch);
          this.setState({
            featureName: "",
            featureDescription: ""
          });
          axios.post("/github/branches/" + this.props.store.owner + "/" + this.props.store.projectName, {
            baseBranch: this.state.baseBranch,
            newBranchName: this.state.featureName
          }).then(res => {
            this.props.store.addFeature({
              name: res.data.name,
              description: featureDescription,
              location: res.data.location,
              subTasks: []
            });
          }).catch(err => console.log(err));
          this.props.handleClose();
        } else {
          this.props.handleOpen();
        }
      };

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        });
      };

      render() {
        const { classes, theme } = this.props;
        const { activeStep } = this.state;
        const maxSteps = 2;
        const steps = getSteps();

        return (
          <DialogContent className={classes.root}>
            <Stepper activeStep={activeStep}>
              {steps.map(label => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {this.getStepContent(activeStep)}
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                activeStep === 1? (
                  <Button size="small" onClick={this.handleSubmit}>
                    Create
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                ) : (
                  <Button size="small" onClick={this.handleNext}>
                    Next
                    {theme.direction === "rtl" ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                )    
              }
              backButton={
                <Button size="small" onClick={this.handleBack}>
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  {activeStep === 0 ? (
                    <span onClick={this.props.handleClose}>Cancel</span>
                  ) : (
                    "Back"
                  )}
                </Button>
              }
            />
          </DialogContent>
        );
      }
    }
  )
);

FeatureStepperForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FeatureStepperForm);
