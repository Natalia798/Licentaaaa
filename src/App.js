import React, { Component } from "react";
import "./App.css";

import { Switch, Route, Redirect } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Details from "./Components/Details/Details";
import Login from "./Components/Login/Login";
import Chat from "./Components/Chat/Chat";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/SignUp/SignUp";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import HomePage from "./Components/HomePage/HomePage";
import PdfViewer from "./Components/PdfViewer/PdfViewer";
import BooksR from "./Components/Recommendations/BooksR";
import QuotesR from "./Components/Recommendations/QuotesR";
import AddedBooks from "./Components/BooksLists/AddedBooks/AddedBooks";
import CreateBooks from "./Components/BooksLists/AddedBooks/Create/Create";
import EditBooks from "./Components/BooksLists/AddedBooks/Edit/Edit";
import AddedBooksPdf from "./Components/BooksLists/AddedBooks/AddedBooksPdf";
import InProgress from "./Components/BooksLists/InProgress/InProgress";
import Readed from "./Components/BooksLists/Readed/Readed";
import Favorite from "./Components/BooksLists/Favorite/Favorite";
import FavoriteGenres from "./Components/FavoriteGenres/FavoriteGenres";
import Maps from "./Components/Maps/Maps";

class App extends Component {
  showToast = (type, message) => {
    // 0 = warning, 1 = success
    switch (type) {
      case 0:
        toast.warning(message);
        break;
      case 1:
        toast.success(message);
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="app">
        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          position={toast.POSITION.BOTTOM_RIGHT}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <HomePage showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/details/:id"
            exact
            render={(props) => (
              <Details showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/login"
            exact
            render={(props) => <Login showToast={this.showToast} {...props} />}
          />
          <Route
            path="/signup"
            exact
            render={(props) => <SignUp showToast={this.showToast} {...props} />}
          />
          <Route
            path="/chat"
            exact
            render={(props) => <Chat showToast={this.showToast} {...props} />}
          />
          <Route
            path="/profile"
            exact
            render={(props) => (
              <Profile showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/resetPassword"
            exact
            render={(props) => (
              <ForgotPassword showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/pdf/:id"
            exact
            render={(props) => (
              <PdfViewer showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/addedPdf/:id"
            exact
            render={(props) => (
              <AddedBooksPdf showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/recommendedBooks"
            exact
            render={(props) => <BooksR showToast={this.showToast} {...props} />}
          />
          <Route
            path="/recommendedQuotes"
            exact
            render={(props) => (
              <QuotesR showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/addedByMe"
            exact
            render={(props) => (
              <AddedBooks showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/addBook"
            exact
            render={(props) => (
              <CreateBooks showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/editBook/:id"
            exact
            render={(props) => (
              <EditBooks showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/inProgressList"
            exact
            render={(props) => (
              <InProgress showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/readedList"
            exact
            render={(props) => <Readed showToast={this.showToast} {...props} />}
          />
          <Route
            path="/favoriteList"
            exact
            render={(props) => (
              <Favorite showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/favoriteGenres"
            exact
            render={(props) => (
              <FavoriteGenres showToast={this.showToast} {...props} />
            )}
          />
          <Route
            path="/maps"
            exact
            render={(props) => <Maps showToast={this.showToast} {...props} />}
          />

          <Redirect to="/" />
          <Route
            component={() => <div style={{ padding: 20 }}>Page not found</div>}
          />
        </Switch>
        <Footer showToast={this.showToast} />
      </div>
    );
  }
}

export default App;
