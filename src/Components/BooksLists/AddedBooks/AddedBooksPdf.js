import React, { Component } from "react";
import PDFViewer from "pdf-viewer-reactjs";
import CircularProgress from "@material-ui/core/CircularProgress";
import { myFirestore } from "../../../Config/MyFirebase";
import Button from "@material-ui/core/Button";
import { AppString } from "../../Const";
export default class PdfViewer extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      key: "",
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
          pdf: book.pdf,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.pdf) {
      return (
        <h2 style={{ marginTop: "5%", color: "red", fontWeight: "bold" }}>
          There is no pdf file!
        </h2>
      );
    }

    return (
      <div style={{ margin: "30px 300px" }}>
        <div style={{ marginRight: "100%" }}>
          <Button
            style={{
              border: "1px solid #c55555",
              color: "#c55555",
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
        <div className="border rounded">
          <PDFViewer
            document={{
              url: this.state.pdf,
            }}
            navbarOnTop
          />
        </div>
      </div>
    );
  }
}
