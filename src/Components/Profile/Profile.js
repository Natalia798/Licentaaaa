import React, { Component } from "react";
import ReactLoading from "react-loading";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { myFirestore, myStorage } from "../../Config/MyFirebase";
import images from "./../Themes/Images";
import classes from "./Profile.module.css";
import { AppString } from "./../Const";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import { GoPerson } from "react-icons/go";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      id: localStorage.getItem(AppString.ID),
      nickname: localStorage.getItem(AppString.NICKNAME),
      email: localStorage.getItem(AppString.EMAIL),
      password: localStorage.getItem(AppString.PASSWORD),
      photoUrl: localStorage.getItem(AppString.PHOTO_URL),
    };
    this.newAvatar = null;
    this.newPhotoUrl = "";
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem(AppString.ID)) {
      this.setState({ isLoading: false }, () => {
        this.setState({ isLoading: false });
        this.props.history.push("/profile");
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  onChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) !== 0) {
        this.props.showToast(0, "This file is not an image");
        return;
      }
      this.newAvatar = event.target.files[0];
      this.setState({ photoUrl: URL.createObjectURL(event.target.files[0]) });
    } else {
      this.props.showToast(0, "Something wrong with input file");
    }
  };

  uploadAvatar = () => {
    this.setState({ isLoading: true });
    if (this.newAvatar) {
      const uploadTask = myStorage
        .ref()
        .child(this.state.id)
        .put(this.newAvatar);
      uploadTask.on(
        AppString.UPLOAD_CHANGED,
        null,
        (err) => {
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.updateUserInfo(true, downloadURL);
          });
        }
      );
    } else {
      this.updateUserInfo(false, this.state.photoUrl);
    }
  };

  updateUserInfo = (isUpdatePhotoUrl, downloadURL) => {
    let newInfo;
    if (isUpdatePhotoUrl) {
      newInfo = {
        photoUrl: downloadURL,
      };
    } else {
      newInfo = {
        nickname: this.state.nickname,
        email: this.state.email,
        password: this.state.password,
        photoUrl: this.state.photoUrl,
      };
    }
    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(this.state.id)
      .update(newInfo)
      .then((authUser) => {
        myFirestore
          .collection("users")
          .doc(this.state.id)
          .set({
            id: this.state.id,
            nickname: this.state.nickname,
            photoUrl: downloadURL,
          })
          .then((data) => {
            localStorage.setItem(AppString.NICKNAME, this.state.nickname);
            localStorage.setItem(AppString.EMAIL, this.state.email);
            localStorage.setItem(AppString.PASSWORD, this.state.password);
            if (isUpdatePhotoUrl) {
              localStorage.setItem(AppString.PHOTO_URL, downloadURL);
            }
            this.setState({ isLoading: false });
            this.props.showToast(1, "Update info success");
            this.props.history.push("/");
          });
      });
  };

  render() {
    return (
      <div className={classes.Container}>
        <h1 className={classes.Title}>Account profile</h1>
        <div className={classes.Account}>
          <Avatar
            className={classes.Profile}
            style={{
              color: "white",
              backgroundColor: "rgb(220, 0, 78)",
              marginLeft: "25%",
            }}
          >
            <GoPerson
              style={{ width: "100%", height: "70%", marginLeft: "-5%" }}
            />
          </Avatar>
          <h4 className={classes.Name}>{this.state.nickname}</h4>
        </div>
        <img className={classes.Image} alt="Avatar" src={this.state.photoUrl} />
        <div className={classes.ViewWrapInputFile}>
          <img
            className={classes.ImgInputFile}
            alt="icon gallery"
            src={images.ic_input_file}
            onClick={() => this.refInput.click()}
          />
          <input
            ref={(el) => {
              this.refInput = el;
            }}
            accept="image/*"
            className={classes.ViewInputFile}
            type="file"
            onChange={this.onChangeAvatar}
          />
        </div>

        <div className="Form">
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%" }}
            name="nickname"
            label="Username"
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%" }}
            label="Email Address"
            name="email"
            onChange={this.handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            style={{ width: "70%" }}
            name="password"
            label="Password"
            type="password"
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
              color: "white",
            }}
            onClick={this.uploadAvatar}
          >
            Update
          </Button>
        </div>

        {this.state.isLoading ? (
          <div className={classes.ViewLoading}>
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

export default withRouter(Profile);
