import React, { Component } from "react";
import queryString from "query-string";
import Paging from "../Paging/Paging";
import CircularProgress from "@material-ui/core/CircularProgress";
import Item from "../Item/Item";
import { myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../Const";
import { books } from "../../Books";

class BooksR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      books: books,
      categories: null,
      userId: localStorage.getItem(AppString.ID),
      filteredBooks: [],
    };
    this.ref = myFirestore
      .collection("favoriteGenres")
      .doc(this.state.userId)
      .collection("genres");
  }

  getItems = () => {
    this.ref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          categories: doc.data(),
        });
      });

      let result = [];

      let CATEGORIES = this.state.categories.categories;
      CATEGORIES.map((category) => {
        result = this.state.books.filter(
          (book) => book.category.toLowerCase() === category.toLowerCase()
        );
        this.setState((prevState) => ({
          filteredBooks: [prevState.filteredBooks, result].flat(),
        }));
        this.setState({ totalItemsCount: this.state.filteredBooks.length });
      });
    });
  };

  componentDidMount() {
    this.getItems();
  }

  componentWillUnmount() {
    this.getItems();
  }

  render() {
    let qs = queryString.parse(this.props.location.search);
    let itemsPerPage = qs.itemsPerPage || 10;
    let page = qs.page || 1;

    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }
    return (
      <div>
        {/* Product list header */}
        <div>
          <h3
            style={{
              backgroundColor: "#c55555",
              color: "black",
              borderRadius: "6px",
              fontSize: "25px",
              fontWeight: 700,
              lineHeight: 0.45,
              padding: "20px 20px",
              width: "85%",
              margin: "20px auto 50px auto",
            }}
          >
            Recommended books
          </h3>
        </div>

        <div style={{ marginTop: "-2%" }}>
          {this.state.filteredBooks &&
            this.state.filteredBooks
              .map((book) => <Item key={book.id} item={book} />)
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)}
        </div>

        {!this.state.loading && !!this.state.totalItemsCount && (
          <Paging
            itemsPerPage={10}
            page={page}
            totalItemsCount={this.state.totalItemsCount}
          />
        )}
      </div>
    );
  }
}

export default BooksR;
