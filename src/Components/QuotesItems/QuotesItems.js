import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

class QuotesItems extends Component {
  render() {
    return (
      <Card
        style={{ width: 300, height: 350, margin: 10, display: "inline-block" }}
      >
        <CardMedia
          style={{
            height: 300,
            width: 250,
            marginLeft: 25,
            marginTop: 10,
            marginBottom: 10,
            objectFit: "contain",
          }}
          image={this.props.item.image}
        />
      </Card>
    );
  }
}

export default withRouter(QuotesItems);
