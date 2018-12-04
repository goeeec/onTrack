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
  ListItemText
} from "@material-ui/core";
import { observer, inject } from "mobx-react";

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
          featureDescription: ""
        };
      }

      getStepContent = stepIndex => {
        switch (stepIndex) {
          case 0:
            return (
              <form onSubmit={this.handleSubmit}>
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
                    Feature name: {this.state.featureName}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Description: {this.props.featureDescription}
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
        e.preventDefault();
        const { featureName, featureDescription } = this.state;
        if (featureName && featureDescription) {
          console.log(featureName, featureDescription);
          this.setState({
            featureName: "",
            featureDescription: ""
          });
          this.props.store.addFeature({
            name: featureName,
            description: featureDescription,
            subTasks: []
          });
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
                <Button size="small" onClick={this.handleNext}>
                  {activeStep === 1 ? (
                    <span onClick={this.handleSubmit}>Create</span>
                  ) : (
                    "Next"
                  )}
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
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
