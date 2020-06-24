import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { myFirebase } from "../../Config/MyFirebase";

import { MdEmail } from "react-icons/md";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Message } from "semantic-ui-react";

import classes from "./ForgotPassword.module.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleChange = event => {
    const val = event.target.value;
    this.setState({ email: val });
  };

  resetPassword = async event => {
    event.preventDefault();
    const { email } = this.state;
    try {
      await myFirebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.props.showToast(1,"Email has been sent to you. Please check and verify." );
        this.props.history.push("/");
        console.log("sended");
      })
      .catch((err) => {
      this.props.showToast(0, err.message);
      this.setState({ isLoading: false });
      console.log("error1");
      })
    } catch (err) {
      this.props.showToast(0, err.message);
      this.setState({ isLoading: false });
      console.log("error");
    }
  };

  render() {
    return (
      <div className={classes.Container}>
        <Avatar
          className={classes.Avatar}
          style={{ color: "white", backgroundColor: "rgb(220, 0, 78)" }}
        >
          <MdEmail
            style={{ width: "100%", height: "70%", marginLeft: "-5%" }}
          />
        </Avatar>
        <h1 className={classes.Title}>Do you forgot your password or do you want to change it?</h1>
        <form className={classes.Form}>
          <div>
            <Message
              style={{
                fontFamily: "cursive",
                width: "80%",
                position: "relative",
                marginLeft: "10%",
                backgroundColor: 'rgb(239, 224, 247)'
              }}
            >
              Please enter your email address below and we will send you
              information to change your password or to recover your account.
            </Message>
            <TextField
              variant="outlined"
              margin="normal"
              style={{ width: "70%", marginTop: "5%" }}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.Submit}
              style={{
                width: "40%",
                marginTop: "3%",
                backgroundColor: "#c75555",
                color: "white"
              }}
              onClick={this.resetPassword}
            >
              Reset password
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
