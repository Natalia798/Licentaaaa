import firebase from "firebase";
import React, { Component } from "react";
import ReactLoading from "react-loading";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import md5 from "md5";

import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Message } from "semantic-ui-react";

import { myFirebase, myFirestore } from "../../Config/MyFirebase";
import classes from "./Login.module.css";
import { AppString } from "./../Const";
import { FiLogIn } from "react-icons/fi";

class Login extends Component {
  constructor(props) {
    super(props);
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.state = {
      email: "",
      password: "",
      nickname: "",
      isLoading: true,
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    myFirebase
      .auth()
      .setPersistence(myFirebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        myFirebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
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
                localStorage.setItem(AppString.EMAIL, authUser.user.email);
                localStorage.setItem(
                  AppString.PASSWORD,
                  authUser.user.password
                );
                localStorage.setItem(
                  AppString.PHOTO_URL,
                  `http://gravatar.com/avatar/${md5(
                    authUser.user.email
                  )}?d=identicon`
                );
                localStorage.setItem(AppString.NICKNAME, this.state.nickname);
                this.setState({ isLoading: false }, () => {
                  this.props.showToast(1, "Login success");
                  this.props.history.push("/");
                });
              })
              .catch((err) => {
                this.props.showToast(0, err.message);
                this.setState({ isLoading: false });
                console.log("error login");
              });
          })
          .catch((err) => {
            this.props.showToast(0, err.message);
            this.setState({ isLoading: false });
          });
      });
  };

  onGooglePress = () => {
    this.setState({ isLoading: true });
    myFirebase
      .auth()
      .signInWithPopup(this.googleProvider)
      .then((authUser) => {
        myFirestore
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            id: authUser.user.uid,
            nickname: authUser.user.displayName,
            photoUrl: authUser.user.photoURL,
          })
          .then((data) => {
            localStorage.setItem(AppString.ID, authUser.user.uid);
            localStorage.setItem(AppString.NICKNAME, authUser.user.displayName);
            localStorage.setItem(AppString.PHOTO_URL, authUser.user.photoURL);
            localStorage.setItem(AppString.EMAIL, authUser.user.email);
            localStorage.setItem(AppString.PASSWORD, authUser.user.password);
            this.setState({ isLoading: false }, () => {
              this.props.showToast(1, "Login success");
              this.props.history.push("/");
            });
          })
          .catch((err) => {
            this.props.showToast(0, err.message);
            this.setState({ isLoading: false });
            console.log("error signup");
          });
      })
      .catch((err) => {
        this.props.showToast(0, err.message);
        this.setState({ isLoading: false });
      });
  };

  onFacebookPress = () => {
    this.setState({ isLoading: true });
    myFirebase
      .auth()
      .signInWithPopup(this.facebookProvider)
      .then((authUser) => {
        myFirestore
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            id: authUser.user.uid,
            nickname: authUser.user.displayName,
            photoUrl: authUser.user.photoURL,
          })
          .then((data) => {
            localStorage.setItem(AppString.ID, authUser.user.uid);
            localStorage.setItem(AppString.NICKNAME, authUser.user.displayName);
            localStorage.setItem(AppString.PHOTO_URL, authUser.user.photoURL);
            localStorage.setItem(AppString.EMAIL, authUser.user.email);
            localStorage.setItem(AppString.PASSWORD, authUser.user.password);
            this.setState({ isLoading: false }, () => {
              this.props.showToast(1, "Login success");
              this.props.history.push("/");
            });
          })
          .catch((err) => {
            this.props.showToast(0, err.message);
            this.setState({ isLoading: false });
            console.log("error signup");
          });
      })
      .catch((err) => {
        this.props.showToast(0, err.message);
        this.setState({ isLoading: false });
      });
  };

  render() {
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
        <h1 className={classes.Title}>Sign In</h1>
        <form className={classes.Form} noValidate onSubmit={this.handleLogin}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              style={{ width: "70%" }}
              label="Username"
              name="nickname"
              autoComplete="nickname"
              autoFocus
              onChange={this.handleChange}
              value={this.state.nickname}
            />

            <TextField
              variant="outlined"
              margin="normal"
              style={{ width: "70%" }}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.email}
            />

            <TextField
              variant="outlined"
              margin="normal"
              style={{ width: "70%" }}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>

          <Grid container>
            <Grid
              item
              style={{ marginLeft: "15%", marginRight: "15%", marginTop: "3%" }}
            >
              <Link href="/resetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item style={{ marginTop: "3%", marginLeft: "10%" }}>
              <Message style={{ backgroundColor: "rgb(239, 224, 247)" }}>
                Don't have an account?{" "}
                <Link to="/signup" href="signup" variant="body2">
                  Sign Up
                </Link>
              </Message>
            </Grid>
          </Grid>

          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.Submit}
              style={{
                width: "40%",
                marginTop: "5%",
                backgroundColor: "rgb(82, 175, 121)",
                color: "white",
              }}
            >
              Sign In
            </Button>
          </div>
        </form>
        <h4 style={{ marginTop: "2%", marginBottom: "2%" }}>OR</h4>
        <button className={classes.GoogleBtn} onClick={this.onGooglePress}>
          Login with Google
        </button>

        <button className={classes.FacebookBtn} onClick={this.onFacebookPress}>
          Login with Facebook
        </button>

        {this.state.isLoading ? (
          <div className={classes.Loading}>
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Login);
