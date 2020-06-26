import React, { Component } from "react";
import queryString from "query-string";
import Paging from "../Paging/Paging";
import CircularProgress from "@material-ui/core/CircularProgress";
import BooksRApi from '../../BooksRApi';
import Item from "../Item/Item";

class BooksR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: [],
    };

    this.updateQueryString = this.updateQueryString.bind(this);
  }

  updateQueryString(newValues) {
    let currentQs = queryString.parse(this.props.location.search);
    let newQS = { ...currentQs, ...newValues };
    this.props.history.push("/recommendedBooks/?" + queryString.stringify(newQS));
  }

  async fetchData() {
    this.setState({ loading: true });

    let qsAsObject = queryString.parse(this.props.location.search);
    let results = await BooksRApi.searchItems({
      ...qsAsObject,
    });

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search);

    // Check if the query strings changed.
    let check1 = Object.entries(currentQS).some(([k, v]) => v !== oldQS[k]);
    let check2 = Object.entries(oldQS).some(([k, v]) => v !== currentQS[k]);
    let isDifferent = check1 || check2;

    // We will refetch products only when query string changes.
    if (isDifferent) {
      this.fetchData();
    }
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
        <div >
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
                Motivational books
              </h3>
            </div>

        {/* Here go the items */}
        <div>
          {this.state.items.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>

        {/* Paging component */}
        {!this.state.loading && !!this.state.totalItemsCount && (
          <Paging
            itemsPerPage={itemsPerPage}
            page={page}
            updateQueryString={this.updateQueryString}
            totalItemsCount={this.state.totalItemsCount}
          />
        )}
      </div>
    );
  }
}

export default BooksR;
