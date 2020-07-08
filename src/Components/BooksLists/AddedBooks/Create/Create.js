import React, { Component } from "react";
import { myFirestore, myStorage } from "../../../../Config/MyFirebase";
import { AppString } from "../../../Const";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Create.module.css";
import Button from "@material-ui/core/Button";
import moment from "moment";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      author: "",
      pdf: "",
      userId: localStorage.getItem(AppString.ID),
      loading: false,
    };
    this.newPDF = null;
    this.ref = myFirestore
      .collection("addedBooks")
      .doc(this.state.userId)
      .collection("books");
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onChangePDF = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ isLoading: true });
      this.newPDF = event.target.files[0];
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PDF) === 0) {
        this.uploadPDF();
      } else {
        this.setState({ loading: false });
        this.props.showToast(0, "This file is not a pdf");
      }
    } else {
      this.setState({ isLoading: false });
    }
  };

  uploadPDF = () => {
    if (this.newPDF) {
      const timestamp = moment().valueOf().toString();

      const uploadTask = myStorage.ref().child(timestamp).put(this.newPDF);

      uploadTask.on(
        AppString.UPLOAD_CHANGED,
        null,
        (err) => {
          this.setState({ loading: false });
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ loading: false });
            this.onUploadPDF(downloadURL);
          });
        }
      );
    }
  };

  onUploadPDF = (pdfS) => {
    this.setState({ pdf: pdfS });
  };

  onSubmit = () => {
    const { title, author, pdf } = this.state;
    this.ref
      .add({ title, author, pdf })
      .then((docRef) => {
        this.setState({
          title: "",
          author: "",
          pdf: "",
        });
        this.setState({ loading: false });
        this.props.history.push("/addedByMe");
      })
      .catch((error) => {
        this.props.showToast(0, error);
      });
  };

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    const { title, author } = this.state;
    return (
      <div className={classes.Container}>
        <div className={classes.Items}>
          <h3 className={classes.AddBooks}>ADD BOOKS</h3>
          <div className={classes.Body}>
            <form className={classes.Form}>
              <div className={classes.FormItem}>
                <label className={classes.ItemName}>Title:</label>
                <input
                  style={{ marginLeft: "8%" }}
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className={classes.FormItem}>
                <label className={classes.ItemName}>Author:</label>
                <input
                  style={{ marginLeft: "6%" }}
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <div className={classes.FormItem}>
                <label
                  className={classes.ItemName}
                  style={{ marginLeft: "9%" }}
                >
                  PDF:
                </label>
                <input
                  style={{ marginLeft: "9%" }}
                  ref={(el) => {
                    this.refInput = el;
                  }}
                  type="file"
                  onChange={this.onChangePDF}
                  placeholder="PDF"
                />
              </div>

              <div className={classes.Buttons}>
                <div className={classes.SubmitBtn}>
                  <Button
                    style={{
                      border: "1px solid #c55555",
                      color: "#c55555",
                      fontWeight: "bold",
                    }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      this.onSubmit(this.state.pdf);
                    }}
                  >
                    Submit
                  </Button>
                </div>

                <div className={classes.BackBtn}>
                  <Button
                    style={{
                      border: "1px solid #3db67d",
                      color: "#3db67d",
                      fontWeight: "bold",
                    }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      this.props.history.push("/addedByMe");
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Create);