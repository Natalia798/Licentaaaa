import React, { Component } from "react";
import PDFViewer from "pdf-viewer-reactjs";
import Api from "../../Api";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

export default class PdfViewer extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      item: "",
      loading: false,
    };
  }

  async fetchProductUsingID(id) {
    this.setState({ loading: true });

    let item = await Api.getItemUsingID(id);

    if (this.isCompMounted) {
      this.setState({
        item,
        loading: false,
      });
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

  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div className="container" style={{ margin: "30px 300px" }}>
        <div style={{ marginRight: "100%" }}>
          <Button
            style={{
              border: "1px solid #c55555",
              color: "#c55555",
              fontWeight: "bold",
              minWidth: "150px",
            }}
            color="primary"
            variant="outlined"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Back to Home
          </Button>
        </div>
        <div className="border rounded">
          <PDFViewer
            document={{
              url: this.state.item.pdf,
            }}
            navbarOnTop
          />
        </div>
      </div>
    );
  }
}
