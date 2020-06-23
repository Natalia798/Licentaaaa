import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import md5 from "md5";
import { Message } from "semantic-ui-react";

import classes from "./SignUp.module.css";
import { myFirebase, myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../Const";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { FiLogIn } from "react-icons/fi";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: {
        email: "",
        passwordConfirmation: "",
      },
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem(AppString.ID)) {
      this.setState({ isLoading: false }, () => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const emailError = this.state.errorMessage.email;
    const passwordConfirmationError = this.state.errorMessage
      .passwordConfirmation;

    if (!emailError && !passwordConfirmationError) {
      const { email, password } = this.state;
      myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          myFirestore
            .collection("users")
            .doc(authUser.user.uid)
            .set({
              id: authUser.user.uid,
              nickname: this.state.nickname,
              photoUrl: `http://gravatar.com/avatar/${md5(
                authUser.user.email
              )}?d=identicon`,
            })
            .then((data) => {
              localStorage.setItem(AppString.ID, authUser.user.uid);
              localStorage.setItem(AppString.NICKNAME, this.state.nickname);
              localStorage.setItem(
                AppString.PHOTO_URL,
                `http://gravatar.com/avatar/${md5(
                  authUser.user.email
                )}?d=identicon`
              );
              localStorage.setItem(AppString.EMAIL, authUser.user.email);
              localStorage.setItem(AppString.PASSWORD, authUser.user.password);
              this.setState({ isLoading: false }, () => {
                this.props.history.push("/");
              });
            })
            .catch((err) => {
              this.props.showToast(0, err.message);
              this.setState({ isLoading: false });
            });
        })
        .catch((err) => {
          this.props.showToast(0, err.message);
          this.setState({ isLoading: false });
          console.log("error");
        });
    } else {
      this.props.showToast(0, "SignUp failed");
    }
  };

  //Username
  handleUsernameChange = (event) => {
    this.setState({ nickname: event.target.value });
  };

  //EMAIL
  handleEmailChange = (event) => {
    const val = event.target.value;
    const errorMessage = {
      ...this.state.errorMessage,
      email: "Email is invalid",
    };
    if (
      val.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      errorMessage.email = "";
    }
    this.setState({ email: val, errorMessage });
  };

  //PASSWORD
  handleChange = (event) => {
    this.setState({ password: event.target.value });
  };

  //CONFIRM PASSWORD
  handleConfirmPassword = (event) => {
    const val = event.target.value;
    const errorMessage = {
      ...this.state.errorMessage,
      passwordConfirmation: "",
    };
    if (val !== this.state.password) {
      errorMessage.passwordConfirmation = "Password doesn't match";
    }
    this.setState({ passwordConfirmation: val, errorMessage });
  };

  cancelBtnHandle = () => {
    this.props.history.push("/");
  };

  render() {
    if (localStorage.getItem(AppString.ID)) {
      this.cancelBtnHandle();
    }

    return (
      <div className={classes.Container}>
        <Avatar
          className={classes.Avatar}
          style={{ color: "white", backgroundColor: "rgb(220, 0, 78)" }}
        >
          <FiLogIn
            style={{ width: "100%", height: "70%", marginLeft: "-5%" }}
          />
        </Avatar>
        <h1 className={classes.Title}>Sign Up</h1>
        <form className={classes.Form} noValidate onSubmit={this.handleSubmit}>
          <div>
            <TextField
              autoComplete="nickname"
              margin="normal"
              name="nickname"
              variant="outlined"
              style={{ width: "70%" }}
              label="Username"
              className={classes.TextField}
              autoFocus
              onChange={this.handleUsernameChange}
            />

            {this.state.errorMessage.email ? (
              <TextField
                variant="outlined"
                margin="normal"
                style={{ width: "70%" }}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleEmailChange}
                error
                helperText={this.state.errorMessage.email}
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                style={{ width: "70%" }}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleEmailChange}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              style={{ width: "70%" }}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />

            {this.state.errorMessage.passwordConfirmation ? (
              <TextField
                variant="outlined"
                margin="normal"
                style={{ width: "70%" }}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="confirm-password"
                error
                helperText={this.state.errorMessage.passwordConfirmation}
                onChange={this.handleConfirmPassword}
              />
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                style={{ width: "70%" }}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                autoComplete="confirm-password"
                onChange={this.handleConfirmPassword}
              />
            )}
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ width: "50%", marginTop: "3%" }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item style={{ marginTop: "2%", marginRight: "15%" }}>
                <Message>
                  Already have an account?{" "}
                  <Link to="/login" href="login" variant="body2">
                    Sign in
                  </Link>
                </Message>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);