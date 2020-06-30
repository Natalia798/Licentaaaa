import React, { Component } from "react";
import { myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../Const";
import Button from "@material-ui/core/Button";
import * as R from "ramda";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";

class FavoriteGenres extends Component {
  // Checkbox Initial State
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      userId: localStorage.getItem(AppString.ID),
    };
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
  }


  onChangeCheckBox = (value) => {
    if (this.state.categories && R.contains(value, this.state.categories)) {
      this.setState({ categories: R.without(value, this.state.categories) });
    } else {
      this.setState({
        categories: this.state.categories
          ? R.uniq([...this.state.categories, value])
          : [value],
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    myFirestore
      .collection("favoriteGenres")
      .doc(this.state.userId)
      .collection("genres")
      .add({
        categories: this.state.categories,
      })
      .then(() => {
        this.props.history.push("/recommendedBooks");
        this.setState({ checkData: "" });
      })
      .catch((err) => {
        this.props.showToast(0, err);
      });
  };

  render() {
    return (
      <div>
        <h2
          style={{
            backgroundColor: "#c55555",
            color: "black",
            borderRadius: "6px",
            fontSize: "25px",
            fontWeight: 700,
            lineHeight: 1.15,
            padding: "20px 20px",
            width: "95%",
            margin: "20px auto 50px auto",
          }}
        >
          We use your favorite genres to make better books recommendations and
          tailor what you see in your Books Recommendations feed.
        </h2>
        <form onSubmit={this.onSubmit}>
          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="adventure"
                  checked={
                    this.state.categories &&
                    R.contains("adventure", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={
                <b style={{ fontSize: "24px", color: "black" }}>Adventure</b>
              }
            />
          </div>

          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="biography"
                  checked={
                    this.state.categories &&
                    R.contains("biography", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={
                <b style={{ fontSize: "24px", color: "black" }}>Biography</b>
              }
            />
          </div>

          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="horror"
                  checked={
                    this.state.categories &&
                    R.contains("horror", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={<b style={{ fontSize: "24px", color: "black" }}>Horror</b>}
            />
          </div>

          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="leadership"
                  checked={
                    this.state.categories &&
                    R.contains("leadership", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={
                <b style={{ fontSize: "24px", color: "black" }}>Leadership</b>
              }
            />
          </div>
          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="motivational"
                  checked={
                    this.state.categories &&
                    R.contains("motivational", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={
                <b style={{ fontSize: "24px", color: "black" }}>Motivational</b>
              }
            />
          </div>
          <div style={{ marginBottom: "2px" }}>
            <FormControlLabel
              style={{ color: "black", fontSize: "24px" }}
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  value="personalDevelopment"
                  checked={
                    this.state.categories &&
                    R.contains("personalDevelopment", this.state.categories)
                  }
                  onChange={(event) =>
                    this.onChangeCheckBox(event.target.value)
                  }
                  style={{ marginRight: "5px", color: "red" }}
                />
              }
              label={
                <b style={{ fontSize: "24px", color: "black" }}>
                  Personal development
                </b>
              }
            />
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                width: "6%",
                marginTop: "2px",
                backgroundColor: "#c55555",
                color: "black",
                fontSize: "18px",
              }}
            >
              <b>Submit</b>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default FavoriteGenres;
