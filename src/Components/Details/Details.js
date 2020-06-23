import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { myFirestore } from "../../Config/MyFirebase";
import Api from "../../Api";
import classes from "./Details.module.css";
import Item from "../Item/Item";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppString } from "../Const";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class Details extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: "",
      title: "",
      author: "",
      bookId: "",
      loading: false,
      userId: localStorage.getItem(AppString.ID),
    };
    this.inProgressRef = myFirestore
      .collection("inProgressBooksList")
      .doc(this.state.userId)
      .collection("books");
    this.readedRef = myFirestore
      .collection("readedBooksList")
      .doc(this.state.userId)
      .collection("books");
    this.favoriteRef = myFirestore
      .collection("favoriteBooksList")
      .doc(this.state.userId)
      .collection("books");
  }

  async fetchProductUsingID(id) {
    this.setState({ loading: true });

    let item = await Api.getItemUsingID(id);
    let relatedItems = await Api.searchItems({ category: item.category });
    let title = item.name;
    let author = item.author;
    let bookId = item.id;
    if (this.isCompMounted) {
      this.setState({
        item,
        relatedItems: relatedItems.data.filter((x) => x.id !== item.id),
        loading: false,
        title,
        author,
        bookId
      });
      console.log(item)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProductUsingID(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProductUsingID(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  addToProgressList = () => {
    const { title, author, bookId } = this.state;
    this.inProgressRef
      .add({ title, author, bookId })
      .then((docRef) => {
        this.setState({
          title: "",
          author: "",
          bookId: ""
        });
        this.props.history.push("/inProgressList");
      })
      .catch((err) => {
        console.log("Error adding document: ", err);
      });
  };

  addToReadedList = () => {
    const { title, author, bookId} = this.state;
    this.readedRef
      .add({ title, author, bookId })
      .then((docRef) => {
        this.setState({
          title: "",
          author: "",
          bookId: ""
        });
        this.props.history.push("/readedList");
      })
      .catch((err) => {
        console.log("Error adding document: ", err);
      });
  };

  addToFavoriteList = () => {
    const { title, author, bookId } = this.state;
    this.favoriteRef
      .add({ title, author, bookId })
      .then((docRef) => {
        this.setState({
          title: "",
          author: "",
          bookId: ""
        });
        this.props.history.push("/favoriteList");
      })
      .catch((err) => {
        console.log("Error adding document: ", err);
      });
  };
  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }
    return (
      <div className={classes.ItemDetails}>
        <div className={classes.Container}>
          {/* Image */}
          <div className={classes.Image}>
            <img src={this.state.item.image} alt="" className={classes.Img} />
          </div>
          <div className={classes.Details}>
            {/* Title */}
            <div className={classes.Title}>
              Title:{" "}
              <i style={{ color: "#cc7c7c" }}> {this.state.item.name} </i>
            </div>
            <div className={classes.Author}>
              Author:{" "}
              <i style={{ color: "#4699b8" }}> {this.state.item.author} </i>
            </div>
            {/* Description */}
            <div className={classes.Description}>
              Description:{" "}
              <i style={{ color: "#228B22" }}>
                {this.state.item.description ? (
                  this.state.item.description
                ) : (
                  <i style={{ color: "gray" }}> Not available </i>
                )}
              </i>
            </div>
            {/* Popular, buttons */}
            <div className={classes.Buttons}>
              <div className={classes.Popular}>
                {this.state.item.popular && <span> (Popular book) </span>}
              </div>
              <div className={classes.BackBtn}>
                <Button
                  style={{
                    border: "1px solid #c75555",
                    color: "#c75555",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    this.props.history.push("/");
                  }}
                >
                  Back to home
                </Button>
              </div>
              <div className={classes.ReadBtn}>
                <Button
                  style={{
                    border: "1px solid rgb(223, 74, 178)",
                    color: "rgb(223, 74, 178)",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    this.props.history.push("/pdf/" + this.state.item.bookId);
                  }}
                >
                  Read here
                </Button>
              </div>
              <div className={classes.ListBtn}>
                <Button
                  style={{
                    border: "1px solid #3db67d)",
                    color: "#3db67d",
                    fontWeight: "bold",
                  }}
                  color="primary"
                  variant="outlined"
                >
                  Add book to
                  <Select
                    style={{ maxWidth: 200, marginLeft: 20 }}
                    MenuProps={{
                      style: {
                        maxHeight: 500,
                      },
                    }}
                  >
                    <MenuItem
                      disabled
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Books list:
                    </MenuItem>
                    <MenuItem
                      style={{ color: "#3db67d", fontWeight: "bold" }}
                      onClick={this.addToProgressList}
                    >
                      In progress
                    </MenuItem>
                    <MenuItem
                      style={{ color: "#3db67d", fontWeight: "bold" }}
                      onClick={this.addToReadedList}
                    >
                      Done
                    </MenuItem>
                    <MenuItem
                      style={{ color: "#3db67d", fontWeight: "bold" }}
                      onClick={this.addToFavoriteList}
                    >
                      Favorite
                    </MenuItem>
                  </Select>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr className={classes.Line} />
        </div>
        {/* Related Items */}
        <div className={classes.RelatedItems}>
          <i>Related books</i>
          <div className={classes.Items}>
            {this.state.relatedItems.slice(0, 3).map((x) => {
              return <Item key={x.id} item={x} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
