import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Context
import { withAuth } from '../../../Context/AuthContext';

// Services
import userService from '../../../services/userService';
import ChatUserService from '../../../services/chatUserService';

// Functions
import { getCoords } from '../../../helpers/coordinates';

// Components
import avatarDefault from '../../../images/avatar.svg';

class UserMe extends Component {
  _isMounted = false;

  state = {
    userName: '',
    lastName: '',
    email: '',
    city: '',
    age: '',
    avatar: '',
    edit: false,
    loading: true,
    pictures: [],
    chats: [],
    status: '',
  };

  handleInvite = () => {
    const { user, showuser } = this.props;
    const body = { userChat01: user._id, userChat02: showuser._id };
    ChatUserService.createChatUser(body);
    if (this._isMounted) {
      this.setState({
        status: 'pending',
      });
    }
  };

  handleEdit = () => {
    if (this._isMounted) {
      this.setState({
        edit: !this.state.edit,
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (this._isMounted) {
      this.setState({ [name]: value });
    }
  };

  handleUserGet = async user => {
    const newUser = await userService.getUserById(user._id);
    if (this._isMounted) {
      this.setState({
        userName: newUser.userName,
        lastName: newUser.lastName,
        email: newUser.email,
        city: newUser.city,
        age: newUser.age,
        avatar: newUser.avatar,
        loading: false,
      });
    }
  };

  handleGetChatBetweenUsers = async (userId01, userId02) => {
    if (userId01 !== undefined && userId02 !== undefined) {
      const chatUser = await ChatUserService.getAllChatUserTowId(userId01, userId02);

      if (chatUser) {
        this.setState({ chatUser, status: chatUser.status });
      }
    }
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const { userName, lastName, email, age, city } = this.state;

    const newUser = await userService.updateUser(
      this.props.user._id,
      userName,
      lastName,
      email,
      age,
      city,
      latitude,
      longitude,
    );

    this.props.changeSession(newUser);
    if (this._isMounted) {
      this.setState({ edit: false });
    }

    // this.handleUserGet(this.props.user);
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.handleUserGet(this.props.user);
    this.handleGetChatBetweenUsers(this.props.user._id, this.props.showuser._id);
  };

  showWidget = widget => {
    widget.open();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkUploadResult = async resultEvent => {
    if (resultEvent.event === 'success') {
      await userService.updateUserAvatar(this.props.user._id, resultEvent.info.secure_url);
      this.setState({ avatar: resultEvent.info.secure_url });
      const newUser = { ...this.props.user };
      newUser.avatar = resultEvent.info.secure_url;
      this.props.changeSession(newUser);
    }
  };

  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dldvty15u',
        uploadPreset: 'ggbp4y7j',
      },
      (error, result) => {
        this.checkUploadResult(result);
      },
    );

    const { showuser } = this.props;
    const { edit, loading, userName, lastName, email, avatar, age, city, status, chatUser } = this.state;

    const checked = edit ? 'checked' : '';

    return (
      <>
        {!loading && (
          <div className="user">
            {showuser._id !== undefined ? (
              <>
                <div className="">
                  <div className="header-user header-user__greycolor">
                    <div className="o-avatar is-active w-50precent is-headerUser-absolute ">
                      <div className="o-avatar__inner">
                        <img
                          className="o-avatar__img"
                          src={showuser.avatar !== '' ? showuser.avatar : avatarDefault}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="details-content">
                      <div className="titular">
                        <h1>
                          {showuser.userName}
                          <br />
                          {showuser.lastName}
                        </h1>
                      </div>
                      <div className=" titular ">
                        <h3>{showuser.email}</h3>
                      </div>
                      <div className="titular">
                        {showuser.city} {showuser.age} years old
                      </div>
                    </div>
                  </div>
                </div>
                {status === undefined && (
                  <div className="btn-user-header ">
                    <div className="o-btn " onClick={this.handleInvite}>
                      INVITE ME
                    </div>
                  </div>
                )}

                {status === 'active' && (
                  <div className="btn-user-header ">
                    <NavLink to={`/users/private-chat/${chatUser._id}`}>
                      <div className="o-btn">TALK ME</div>
                    </NavLink>
                  </div>
                )}
                {status === 'pending' && (
                  <div className="btn-user-header ">
                    <div className="o-btn is-disabled ">PENDING</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="">
                  <div className="edit edit-margin-bottom">
                    <div className="btn-user-header btn-user-header__left">
                      <div className="o-btn o-btn--theme2" onClick={this.props.handleLogout}>
                        Logout
                      </div>
                    </div>
                    <div className="btn-user-header ">
                      <div className="flex-centered-aligned">
                        <div className="edit-mode-text">Edit Mode:</div>
                        <div className="edit-mode-switch">
                          <label className="switch">
                            <input type="checkbox" checked={checked} onChange={this.handleEdit} />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-user header-user__greycolor">
                    <div className="o-avatar is-active w-50precent is-headerUser-absolute ">
                      <div
                        onClick={() => {
                          this.showWidget(widget);
                        }}
                        className="o-avatar__inner"
                      >
                        <img
                          className={edit ? 'o-avatar__img border-active-editable' : 'o-avatar__img border-active'}
                          src={avatar !== '' ? avatar : avatarDefault}
                          alt=""
                        ></img>
                      </div>
                    </div>
                    {edit ? (
                      <form className="text-centered" onSubmit={this.handleFormSubmit}>
                        <div className="details-content">
                          <div className="titular">
                            <input
                              type="text"
                              className="input input-filter user-name"
                              placeholder="User Name"
                              name="userName"
                              value={userName}
                              onChange={this.handleChange}
                            />
                            <br />
                            <input
                              type="text"
                              className="input input-filter user-last-name"
                              placeholder="Last Name"
                              name="lastName"
                              value={lastName}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className=" titular ">
                            <input
                              type="text"
                              className="input input-filter user-email"
                              placeholder="Email"
                              name="email"
                              value={email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="titular">
                            <input
                              type="text"
                              placeholder="City"
                              className="input input-filter user-city"
                              name="city"
                              value={city}
                              onChange={this.handleChange}
                            />
                            <input
                              type="text"
                              placeholder="Age"
                              className="input input-filter user-age"
                              name="age"
                              value={age}
                              onChange={this.handleChange}
                            />
                            years old
                          </div>
                        </div>
                        <div className="flex-centered">
                          <input
                            onClick={this.handleFormSubmit}
                            className="action-btn-medium"
                            type="submit"
                            value="Update!"
                          />
                        </div>
                      </form>
                    ) : (
                      <div className="details-content">
                        <div className="titular">
                          <h1>
                            {userName}
                            <br />
                            {lastName}
                          </h1>
                        </div>
                        <div className=" titular ">
                          <h3>{email}</h3>
                        </div>
                        <div className="titular">
                          {city} {age} years old
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {loading && <div className="loader">Loading...</div>}
      </>
    );
  }
}

UserMe.propTypes = {
  user: PropTypes.object,
  showuser: PropTypes.object,
  changeSession: PropTypes.func,
};

export default withAuth(UserMe);
