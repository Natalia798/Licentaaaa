import React, { Component } from "react";
import { myFirestore } from "../../../Config/MyFirebase";
import Button from "@material-ui/core/Button";
import classes from "./Readed.module.css";
import { AppString } from "../../Const";
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

class Readed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userId: localStorage.getItem(AppString.ID),
      loading: false,
    };
    this.ref = myFirestore
      .collection("readedBooksList")
      .doc(this.state.userId)
      .collection("books");
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, bookId } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        author,
        bookId,
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
      .collection("readedBooksList")
      .doc(this.state.userId)
      .collection("books")
      .doc(id)
      .delete()
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/readedList");
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
          <h3 className={classes.BookList}>"Readed" books list</h3>
          <div className={classes.Body}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Details</th>
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
                          this.props.history.push("/details/" + book.bookId);
                        }}
                      >
                        Details
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

export default withRouter(Readed);
