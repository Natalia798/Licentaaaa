import React, { Component } from "react";
import { myFirestore, myStorage } from "../../../../Config/MyFirebase";
import { AppString } from "../../../Const";
import classes from "./Edit.module.css";
import Button from "@material-ui/core/Button";
import moment from "moment";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      author: "",
      pdf: "",
      userId: localStorage.getItem(AppString.ID),
    };
  }

  componentDidMount() {
    const ref = myFirestore
      .collection("addedBooks")
      .doc(this.state.userId)
      .collection("books")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const book = doc.data();
        this.setState({
          key: doc.id,
          title: book.title,
          author: book.author,
          pdf: book.pdf,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ book: state });
  };

  onChangePDF = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ isLoading: true });
      this.newPDF = event.target.files[0];
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PDF) === 0) {
        this.uploadPDF();
      } else {
        this.setState({ isLoading: false });
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
          this.setState({ isLoading: false });
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.setState({ isLoading: false });
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
    console.log("edit", this.state.pdf);
    const updateRef = myFirestore
      .collection("addedBooks")
      .myFirestore.collection("addedBooks")
      .doc(this.state.userId)
      .collection("books")
      .doc(this.props.match.params.id);
    updateRef
      .set({
        title,
        author,
        pdf,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          title: "",
          author: "",
          pdf: "",
        });
        this.props.history.push("/addedByMe");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Items}>
          <h3 className={classes.EditBooks}>EDIT BOOKS</h3>

          <div className={classes.Body}>
            <form className={classes.Form}>
              <div className={classes.FormItem}>
                <label className={classes.ItemName}>Title:</label>
                <input
                  style={{ marginLeft: "6%" }}
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className={classes.FormItem}>
                <label className={classes.ItemName}>Author:</label>
                <input
                  style={{ marginLeft: "4.2%" }}
                  type="text"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <div className={classes.FormItem}>
                <label
                  className={classes.ItemName}
                  style={{ marginLeft: "7%" }}
                >
                  PDF:
                </label>
                <input
                  style={{ marginLeft: "7%" }}
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
                      minWidth: "225px",
                    }}
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      this.props.history.push("/addedByMe");
                    }}
                  >
                    Back to Added Books
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

export default Edit;
