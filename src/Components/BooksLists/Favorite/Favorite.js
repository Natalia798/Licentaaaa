import React, { Component } from "react";
import { myFirestore } from "../../../Config/MyFirebase";
import Button from "@material-ui/core/Button";
import classes from "./Favorite.module.css";
import {AppString} from '../../Const';
import { withRouter } from "react-router-dom";

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      userId: localStorage.getItem(AppString.ID),
    };
    this.ref = myFirestore
      .collection("favoriteBooksList")
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
        bookId
      });
    });
    this.setState({
      books,
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
      .collection("favoriteBooksList")
      .doc(this.state.userId)
      .collection("books")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/favoriteList");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Items}>
          <h3 className={classes.BookList}>FAVORITE BOOKS LIST</h3>
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

export default withRouter(Favorite);
