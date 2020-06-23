import React, { Component } from "react";
import queryString from "query-string";

import { categories } from "../../Data";
import Item from "../Item/Item";
import Api from "../../Api";
import Paging from "../Paging/Paging";
import PopUp from "../PopUp/PopUp";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";

// Option items for product categories.
const categoryOptions = categories.map((x) => {
  return (
    <MenuItem key={x.name} value={x.name}>
      {x.name}
    </MenuItem>
  );
});

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: [],
      searchTerm: "",
      categoryFilterValue: categories[0].name,
      open: false,
    };

    this.updateQueryString = this.updateQueryString.bind(this);
  }

  updateQueryString(newValues) {
    let currentQs = queryString.parse(this.props.location.search);
    let newQS = { ...currentQs, ...newValues };
    this.props.history.push("/?" + queryString.stringify(newQS));
  }

  async fetchData() {
    this.setState({ loading: true });

    let qsAsObject = queryString.parse(this.props.location.search);
    let results = await Api.searchItems({
      ...qsAsObject,
    });

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength,
    });
  }

  togglePopUp = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    this.togglePopUp();
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

  handleSortChange = (e) => {
    this.updateQueryString({ sortValue: e.value });
  };

  getPageTitle() {
    let pageTitle = "Search results";
    let category = queryString.parse(this.props.location.search).category;
    let directClick =
      queryString.parse(this.props.location.search).directClick === "true";

    if (!category) {
      pageTitle = "Popular books";
    } else if (directClick) {
      pageTitle = category;
    }
    return pageTitle;
  }

  render() {
    let qs = queryString.parse(this.props.location.search);
    let itemsPerPage = qs.itemsPerPage || 10;
    let page = qs.page || 1;
    let pageTitle = this.getPageTitle();

    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div>
        {this.state.open ? <PopUp toggle={this.togglePopUp} /> : null}

        <AppBar
          position="static"
          style={{ backgroundColor: "rgb(230, 207, 243)", paddingTop: "0.5%" }}
        >
          <Toolbar>
            <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
              <TextField
                label="Search books by title or author"
                value={this.state.searchTerm}
                onChange={(e) => {
                  this.setState({ searchTerm: e.target.value });
                  console.log(this.state.searchTerm);
                }}
                style={{ marginLeft: 30, width: 250, marginBottom: 15 }}
              />

              <Select
                style={{ maxWidth: 200, marginLeft: 20 }}
                value={this.state.categoryFilterValue}
                MenuProps={{
                  style: {
                    maxHeight: 500,
                  },
                }}
                onChange={(e) => {
                  this.setState({ categoryFilterValue: e.target.value });
                }}
              >
                {categoryOptions}
              </Select>

              <Button
                style={{ marginLeft: 20, color: "#c75555", fontWeight: "bold" }}
                variant="outlined"
                onClick={() => {
                  this.props.history.push(
                    "/?category=" +
                      this.state.categoryFilterValue +
                      "&term=" +
                      this.state.searchTerm
                  );
                }}
              >
                {" "}
                Search
              </Button>
            </div>
          </Toolbar>
        </AppBar>

        {/* Product list header */}
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 }}>
            <div style={{ marginLeft: 100 }}>{pageTitle}</div>
            {!this.state.loading && (
              <div
                style={{
                  fontSize: 12,
                  color: "gray",
                  marginTop: 5,
                  marginLeft: 120,
                }}
              >
                Total results found: {this.state.totalItemsCount}
              </div>
            )}
          </div>
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

export default HomePage;
