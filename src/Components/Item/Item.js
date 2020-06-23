import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

class Item extends Component {
  render() {
    return (
      <Card
        style={{ width: 300, height: 450, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
        style={{height: "85%"}}
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.id);
          }}
        >
          <CardMedia
            style={{
              height: 300,
              width: 250,
              marginLeft: 25,
              marginTop: 10,
              marginBottom: 10,
              objectFit: "contain"
            }}
            image={this.props.item.image}
          />
          <CardContent style={{ height: 65, textAlign: "center", paddingTop: 2}}>
            <div
              style={{
                marginRight: 2,
                marginLeft: 2,
                fontWeight: "bold",
                whiteSpace: "wrap"
                
              }}
            >
              Title:{" "}
              <b>
                <i style={{ color: "#ff9b9b" }}>{this.props.item.name} </i>{" "}
              </b>
            </div>
            <div
              style={{
                marginTop: 3,
                fontWeight: "bold",
                whiteSpace: "wrap"
              }}
            >
              Author:{" "}
              <i style={{ color: "#58c0e7" }}>{this.props.item.author}</i>
            </div>
            <div
              style={{ 
                color: "#1a9349", 
                fontWeight: "bold"
                }}
            >
              {this.props.item.popular && "Popular"}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "block", height: 40, marginTop: 15 }}
        >
          <Button
            size="small"
            style={{border: "1px solid #c75555", color: "#c75555", fontWeight: "bold", marginRight: 20 }}
            onClick={() => {
              this.props.history.push("/details/" + this.props.item.id);
            }}
          >
            {" "}
            Details
          </Button>
          <Button
            size="small"
            style={{border: "1px solid rgb(223, 74, 178)", color: "rgb(223, 74, 178)", fontWeight: "bold", marginLeft: 20}}
            onClick={() => {
              this.props.history.push("/pdf/" + this.props.item.id);
            }}
          >
            {" "}
            Read here
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(Item);
