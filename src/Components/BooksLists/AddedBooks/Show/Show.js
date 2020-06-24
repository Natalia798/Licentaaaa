import React, { Component } from "react";
import { myFirestore } from "../../../../Config/MyFirebase";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./Show.module.css";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [],
      key: "",
      loading: false
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
        this.setState({
          book: doc.data(),
          key: doc.id,
        });
      } else {
        this.props.showToast(0, "No such document!");
      }
    });
  }

  delete(id) {
    myFirestore
      .collection("addedBooks")
      .doc(this.state.userId)
      .collection("books")
      .doc(id)
      .delete()
      .then(() => {
        this.setState({loading: false})
        this.props.history.push("/addedByMe");
      })
      .catch((error) => {
        this.props.showToast(0, error);
      });
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    return (
      <div className={classes.ItemDetails}>
        <h3 className={classes.BookDetails}>DETAILS</h3>
        <div className={classes.Container}>
          <div className={classes.Details}>
            <div className={classes.Title}>
              <b>Title: </b>
              <i style={{ color: "#cc7c7c" }}> {this.state.book.title} </i>
            </div>
            <div className={classes.Author}>
              <b>Author: </b>
              <i style={{ color: "#4699b8" }}> {this.state.book.author} </i>
            </div>

            <div className={classes.Buttons}>
              <div className={classes.EditBtn}>
                <Button
                  style={{
                    border: "1px solid #c75555",
                    color: "#c75555",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    this.props.history.push("/editBook/" + this.state.key);
                  }}
                >
                  Edit
                </Button>
              </div>
              <div className={classes.ReadHere}>
                <Button
                  style={{
                    border: "1px solid #8055c5",
                    color: "#8055c5",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    this.props.history.push("/addedPdf/" + this.state.key);
                  }}
                >
                  Read Here
                </Button>
              </div>
              <div className={classes.DeleteBtn}>
                <Button
                  style={{
                    border: "1px solid rgb(223, 74, 178)",
                    color: "rgb(223, 74, 178)",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    this.delete(this.state.key);
                  }}
                >
                  Delete
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
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Show);
