import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    DialogContent,
    Grid
  } from "@material-ui/core";

class UserConfirmInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            userEmail: "",
            userID: "",
            userName: ""
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post("/auth/post_user_info", {
            id : this.state.userID,
            name : this.state.userName,
            email : this.state.userEmail
          }).then(function(body) {
            console.log(body);
        })
        this.props.history.push("/", this.state.userName);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    componentWillMount() {
        axios.get("/auth/user_detail").then(response => {
            if(response.data.passport){
                console.log("dasdas")
                this.setState({
                    userID : response.data.passport.user.id,
                    userEmail : response.data.passport.user.email,
                    userName: response.data.passport.user.name
                })
                if(this.state.userEmail === null)
                    this.setState({ userEmail : "" })
            }
        });
      }

    render() {
        return (
            <div>
              <Link to="/">Home</Link>
              <Grid
                container
                alignItems="center"
                justify="center"
                className="container"
              >
                  <form onSubmit={this.handleSubmit}>
                      <DialogContent>
                          <FormControl fullWidth required>
                              <InputLabel htmlFor="userName" focused required>User Name: </InputLabel>
                              <Input fullWidth required id="userName" placeholder="User Name"
                              onChange={this.handleChange("userName")}
                              value={this.state.userName}
                              />
                          </FormControl>
                          <FormControl fullWidth required>
                              <InputLabel htmlFor="userEmail" focused required>User Email: </InputLabel>
                              <Input fullWidth required id="userEmail" placeholder="User Email" type="email"
                              onChange={this.handleChange("userEmail")}
                              value={this.state.userEmail}
                              />
                          </FormControl>
                          <Button onClick={this.handleSubmit} type="submit" color="primary">Submit</Button>
                      </DialogContent>
                  </form>
                </Grid>
            </div>
        )};
}

export default UserConfirmInfo;
