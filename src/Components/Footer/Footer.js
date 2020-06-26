import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import classes from "./Footer.module.css";

import { TiHomeOutline } from "react-icons/ti";
import { FaSearch, FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";
import {
  AiFillWechat,
  AiOutlineLogin,
  AiOutlineClockCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdMenu, MdDoneAll, MdFavorite, MdAddCircle } from "react-icons/md";
import { GiBookshelf, GiBookAura } from "react-icons/gi";

import { AppString } from "../Const";
import { myFirebase } from "../../Config/MyFirebase";


class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.currentUserId = localStorage.getItem(AppString.ID);
  }

  logout = () => {
    this.setState({ isLoading: true });
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        this.props.showToast(1, "Logout success");
        this.props.history.push("/");
      })

      .catch(function (err) {
        this.props.showToast(0, err.message);
      });
  };

  render() {
    let footer;
    if (localStorage.getItem(AppString.ID)) {
      footer = (
        <footer className={classes.Footer}>
          <ul className={classes.List}>
            <li className={classes.Item}>
              <TiHomeOutline
                style={{ width: "45%", height: "50%" }}
                className={classes.Button}
                title="Home"
                onClick={() => {
                  this.props.history.push("/");
                }}
                cursor="pointer"
              />
            </li>
            <li className={classes.Item}>
              <FaMapMarkerAlt
                style={{ width: "45%", height: "50%" }}
                className={classes.Button}
                title="Maps"
                onClick={() => {
                  this.props.history.push("/maps");
                }}
                cursor="pointer"
              />
            </li>
            <li className={classes.Item}>
              <AiFillWechat
                style={{ width: "45%", height: "50%" }}
                className={classes.Button}
                title="Chat"
                onClick={() => {
                  this.props.history.push("/chat");
                }}
                cursor="pointer"
              />
            </li>

            {/* Books list */}
            <li className={classes.MoreItem}>
              <GiBookshelf
                style={{ width: "45%", height: "50%" }}
                className={classes.Button}
                title="Books"
                cursor="pointer"
              />
              <i className={classes.ArrowUp}></i>
              <ul className={classes.DropdownBooksMenu}>
                <li>
                  <AiOutlineClockCircle
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={classes.Button}
                    title="In progress"
                    onClick={() => {
                      this.props.history.push("/inProgressList");
                    }}
                  />
                </li>
                <li>
                  <MdDoneAll
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={classes.Button}
                    title="Readed"
                    onClick={() => {
                      this.props.history.push("/readedList");
                    }}
                  />
                </li>
                <li>
                  <MdFavorite
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className={classes.Button}
                    title="Favorite"
                    onClick={() => {
                      this.props.history.push("/favoriteList");
                    }}
                  />
                </li>
                <li>
                  <MdAddCircle
                    style={{
                      width: "100%",
                      height: "100%",
                      marginTop: "2%",
                    }}
                    className={classes.Button}
                    title="Added by me"
                    onClick={() => {
                      this.props.history.push("/addedByMe");
                    }}
                  />
                </li>
              </ul>
            </li>

            {/* More items */}
            <li className={classes.MoreItem}>
              <MdMenu
                style={{ width: "45%", height: "50%", marginTop: "10%" }}
                className={classes.Button}
                title="More"
              />
              <i className={classes.ArrowUp}></i>

              <ul className={classes.DropdownMenu}>
                <li>
                  <GiBookAura
                    style={{ width: "100%", height: "100%" }}
                    className={classes.Button}
                    title="Favorite Genres"
                    onClick={() => {
                      this.props.history.push("/favoriteGenres");
                    }}
                  />
                </li>
                <li>
                  <FaUserEdit
                    style={{ width: "100%", height: "100%" }}
                    className={classes.Button}
                    title="User"
                    onClick={() => {
                      this.props.history.push("/profile");
                    }}
                  />
                </li>
                <li>
                  <AiOutlineLogout
                    style={{ width: "100%", height: "100%" }}
                    className={classes.Button}
                    title="Logout"
                    onClick={() => {
                      this.logout();
                      this.props.history.push("/");
                    }}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </footer>
      );
    } else {
      footer = (
        <footer className={classes.Footer}>
          <div className={classes.Item}>
            <AiOutlineLogin
              style={{ width: "45%", height: "50%", marginTop: "10%" }}
              className={classes.Button}
              title="Login"
              onClick={() => {
                this.props.history.push("/login");
              }}
            />
          </div>

          <div className={classes.Item}>
            <FaSearch
              style={{ width: "45%", height: "50%", marginTop: "10%" }}
              className={classes.Button}
              title="Search"
              onClick={() => {
                this.props.history.push("/search");
              }}
            />
          </div>

          <div className={classes.Item}>
            <FaMapMarkerAlt
              style={{ width: "45%", height: "50%", marginTop: "10%" }}
              className={classes.Button}
              title="Maps"
              onClick={() => {
                this.props.history.push("/maps");
              }}
            />
          </div>

        </footer>
      );
    }

    return <div>{footer}</div>;
  }
}

export default withRouter(Footer);
