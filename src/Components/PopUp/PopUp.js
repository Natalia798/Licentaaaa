import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import classes from "./PopUp.module.css";
import { withRouter } from "react-router-dom";

class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Content}>
          <span className={classes.CloseBtn} onClick={this.handleClick}>
            &times;
          </span>
          <h3 style={{ marginTop: 30 }}>
            Are you in a bad mood? Read one of these books or quotes and you'll
            smile again!
          </h3>
          <Button
            size="small"
            style={{
              border: "1px solid rgb(223, 74, 178)",
              color: "rgb(223, 74, 178)",
              fontWeight: "bold",
              marginLeft: 20,
              marginTop: 20,
            }}
            onClick={() => {
              this.props.history.push("/recommendedBooks");
            }}
          >
            {" "}
            Books
          </Button>
          <Button
            size="small"
            style={{
              border: "1px solid #c75555",
              color: "#c75555",
              fontWeight: "bold",
              marginLeft: 20,
              marginTop: 20,
            }}
            onClick={() => {
              this.props.history.push("/recommendedQuotes");
            }}
          >
            {" "}
            Quotes
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(PopUp);