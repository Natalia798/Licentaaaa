import React, { Component } from "react";
import { myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../Const";

class FavoriteGenres extends Component {
  // Checkbox Initial State
  constructor(props) {
      super(props);
      this.state = {
        allCategories: false,
        adventure: false,
        biography: false,
        horror: false,
        leadership: false,
        motivational: false,
        personalDevelopment: false,
      };
  }


  
  // React Checkboxes onChange Methods

  onChangeAll = () => {
    this.setState((initialState) => ({
      allCategories: !initialState.allCategories,
    }));
  };

  onChangeAdventure = () => {
    this.setState((initialState) => ({
      adventure: !initialState.adventure,
    }));
  };

  onChangeBiography = () => {
    this.setState((initialState) => ({
      biography: !initialState.biography,
    }));
  };
  onChangeHorror = () => {
    this.setState((initialState) => ({
      horror: !initialState.horror,
    }));
  };
  onChangeLeadership = () => {
    this.setState((initialState) => ({
      leadership: !initialState.leadership,
    }));
  };
  onChangeMotivational = () => {
    this.setState((initialState) => ({
      motivational: !initialState.motivational,
    }));
  };
  onChangePersonalDev = () => {
    this.setState((initialState) => ({
      personalDevelopment: !initialState.personalDevelopment,
    }));
  };

  // Submit
  onSubmit = (e) => {
    e.preventDefault();

    let checkArray = [];
    for (var key in this.state) {
      if (this.state[key] === true) {
        checkArray.push(key);
      }
    }
    
    let checkData = {genres: checkArray.toString()};
    
    myFirestore
      .collection("favoriteGenres")
      .doc(localStorage.getItem(AppString.ID))
      .collection("genres")
      .add(checkData)
      .then(() => {
        this.props.history.push("/");
        console.log(checkData)
      })
      .catch((err) => {
        this.props.showToast(0, err);
      });
  };

  render() {
    return (
      <div className="App">
        <h2>Store Multiple Checkboxes Values in React</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.allCategories}
                onChange={this.onChangeAll}
                className="form-check-input"
              />
              All categories
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.adventure}
                onChange={this.onChangeAdventure}
                className="form-check-input"
              />
              Adventure
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.biography}
                onChange={this.onChangeBiography}
                className="form-check-input"
              />
              Biography
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.horror}
                onChange={this.onChangeHorror}
                className="form-check-input"
              />
              Horror
            </label>
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.leadership}
                onChange={this.onChangeLeadership}
                className="form-check-input"
              />
              Leadership
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                checked={this.state.personalDevelopment}
                onChange={this.onChangePersonalDev}
                className="form-check-input"
              />
              Persoanl development
            </label>
          </div>

          <div className="form-group">
            <button className="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default FavoriteGenres;
