import React, { Component } from "react";
import { myFirestore } from "../../../Config/MyFirebase";
import Button from "@material-ui/core/Button";
import classes from "./AddedBooks.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppString } from "../../Const";

class AddedBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userId: localStorage.getItem(AppString.ID),
      loading: false,
    };
    this.ref = myFirestore
      .collection("addedBooks")
      .doc(this.state.userId)
      .collection("books");
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
      });
    });
    this.setState({
      books,
      loading: false,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe = null;
  }

  delete(id) {
    myFirestore
      .collection("addedBooks")
      .doc(this.state.userId)
      .collection("books")
      .doc(id)
      .delete()
      .then(() => {
        this.setState({ loading: false });
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
      <div className={classes.Container}>
        <div className={classes.Items}>
          <h3 className={classes.BookList}>"Added by me" books list</h3>
          <div className={classes.Body}>
            <h4 className={classes.AddBooks}>
              <Button
                style={{
                  border: "1px solid #c55555",
                  color: "#c55555",
                  fontWeight: "bold",
                  margin: "10px",
                }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.props.history.push("/addBook");
                }}
              >
                Add books
              </Button>
            </h4>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>PDF</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book, i) => (
                  <tr key={i}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Button
                        style={{
                          border: "1px solid #8055c5",
                          color: "#8055c5",
                          fontWeight: "bold",
                        }}
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.props.history.push("/addedPdf/" + book.key);
                        }}
                      >
                        Read Here
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{
                          border: "1px solid #c75555",
                          color: "#c75555",
                          fontWeight: "bold",
                        }}
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.props.history.push("/editBook/" + book.key);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{
                          border: "1px solid rgb(223, 74, 178)",
                          color: "rgb(223, 74, 178)",
                          fontWeight: "bold",
                        }}
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          this.delete(book.key);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AddedBooks;
