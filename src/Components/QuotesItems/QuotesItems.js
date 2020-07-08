import React, { Component } from "react";
import Card from "@material-ui/core/Card";

class QuotesItems extends Component {
  render() {
    return (
      <Card
        style={{ width: 380, height: 420, margin: 10, display: "inline-block" }}
      >
        <img
          style={{
            width: 380,
            height: 420,
          }}
          src={this.props.item.image}
          alt="Not available"
        />
      </Card>
    );
  }
}

export default QuotesItems;
