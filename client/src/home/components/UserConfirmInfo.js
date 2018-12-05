// import React, { Component } from "react";
// import axios from "axios";
// import {
//     FormControl,
//     InputLabel,
//     Input,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Slide,
//     Select,
//     MenuItem
//   } from "@material-ui/core";

// class UserConfirmInfo extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             userEmail: "",
//             userID: "",
//             userName: "",
//             emailValid: false,
//         };
//     }

//     handleSubmit = e => {
//         e.preventDefault();
//         axios.post("/auth/post_user_info", {
//             id : this.state.userID,
//             name : this.state.userName,
//             email : this.state.userEmail
//           }).then(function(body) {
//             console.log(body);
//         })
//     }

//     handleChange = name => event => {
//         this.setState({
//             [name]: event.target.value
//         });
//     };

//     componentWillMount() {
//         axios.get("/auth/user_detail").then(response => {
//             if(response.data.passport){
//                 console.log("dasdas")
//                 this.setState({
//                     userID : response.data.passport.user.id,
//                     userEmail : response.data.passport.user.email,
//                     userName: response.data.passport.user.name
//                 })
//                 if(this.state.userEmail === null)
//                     this.setState({ userEmail : "" })
//             }
//         });
//       }

//     render() {
//         return (
//             <div>
//                 <p>{this.state.userName}</p>
//                 <p>{this.state.userEmail}</p>
//                 {/* <p>{this.state.userID}</p> */}
//                 <form onSubmit={this.handleSubmit}>
//                     <DialogContent>
//                         <FormControl fullWidth required>
//                             <InputLabel htmlFor="userName" focused required>User Name: </InputLabel>
//                             <Input fullWidth required id="userName" placeholder="User Name"
//                             onChange={this.handleChange("userName")}
//                             value={this.state.userName}
//                             />
//                         </FormControl>
//                         <FormControl fullWidth required>
//                             <InputLabel htmlFor="userEmail" focused required>User Email: </InputLabel>
//                             <Input fullWidth required id="userEmail" placeholder="User Email" type="email"
//                             onChange={this.handleChange("userEmail")}
//                             value={this.state.userEmail}
//                             />
//                         </FormControl>
//                         <Button onClick={this.handleSubmit} type="submit" color="primary">Submit</Button>
//                     </DialogContent>
//                 </form>
//             </div>
//         )};
// }

// export default UserConfirmInfo;
