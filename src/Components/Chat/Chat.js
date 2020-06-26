import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { myFirestore } from "../../Config/MyFirebase";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import "./Chat.css";
import ChatBoard from "../ChatBoard/ChatBoard";
import { AppString } from "../Const";
import Footer from "../Footer/Footer";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentPeerUser: null,
    };
    this.currentUserId = localStorage.getItem(AppString.ID);
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL);
    this.currentUserNickname = localStorage.getItem(AppString.NICKNAME);
    this.listUser = [];
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (!localStorage.getItem(AppString.ID)) {
      this.setState({ isLoading: false }, () => {
        this.props.history.push("/");
      });
    } else {
      this.getListUser();
    }
  };

  getListUser = async () => {
    const result = await myFirestore.collection(AppString.NODE_USERS).get();
    if (result.docs.length > 0) {
      this.listUser = [...result.docs];
      this.setState({ isLoading: false });
    }
  };

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = [];
      this.listUser.forEach((item, index) => {
        if (item.data().id !== this.currentUserId) {
          viewListUser.push(
            <button
              key={index}
              className={
                this.state.currentPeerUser &&
                this.state.currentPeerUser.id === item.data().id
                  ? "ViewWrapItemFocused"
                  : "ViewWrapItem"
              }
              onClick={() => {
                this.setState({ currentPeerUser: item.data() });
              }}
            >
              <img
                className="viewAvatarItem"
                src={item.data().photoUrl}
                alt="icon avatar"
              />
              <div className="ViewWrapContentItem">
                <span className="TextItem">{`${item.data().nickname}`}</span>
              </div>
            </button>
          );
        }
      });
      return viewListUser;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="Container">
        <div className="Chat">
          <div className="ViewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
              <WelcomeBoard
                currentUserNickname={this.currentUserNickname}
                currentUserAvatar={this.currentUserAvatar}
              />
            )}
          </div>
          <div className="VerticalLine"></div>
          {/* Users list */}
          <div className="ViewListUser">
            <div className="ViewWrapMyProfile">
              <h4 style={{ fontFamily: "cursive" }}>My profile:</h4>
              <img
                className="viewCurrentUserAvatar"
                src={this.currentUserAvatar}
                alt="icon avatar"
                style={{ marginLeft: "5%" }}
              />
              <span
                className="TextItem"
                style={{ fontWeight: "bold", marginLeft: "2%" }}
              >
                {this.currentUserNickname}
              </span>
            </div>
            <hr />
            {this.renderListUser()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Chat);
