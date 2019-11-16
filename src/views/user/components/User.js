/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import userService from '../../../services/userService';
import { getCoords } from '../../../helpers/coordinates';
import ChatUserService from '../../../services/chatUserService';
import { withAuth } from '../../../Context/AuthContext';

// Components
import avatarDefault from '../../../images/avatar.svg';

class UserMe extends Component {
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
    this.setState({
      status: 'pending',
    });
  };

  handleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUserGet = async user => {
    const newUser = await userService.getUserById(user._id);
    this.setState({
      userName: newUser.userName,
      lastName: newUser.lastName,
      email: newUser.email,
      city: newUser.city,
      age: newUser.age,
      avatar: newUser.avatar,
      loading: false,
    });
  };

  handleGetChatBetweenUsers = async (userId01, userId02) => {
    const chatUser = await ChatUserService.getAllChatUserTowId(userId01, userId02);

    if (chatUser) {
      this.setState({ chatUser, status: chatUser.status });
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

    this.setState({ edit: false });

    // this.handleUserGet(this.props.user);
  };

  componentDidMount = () => {
    this.handleUserGet(this.props.user);
    this.handleGetChatBetweenUsers(this.props.user._id, this.props.showuser._id);
  };

  showWidget = widget => {
    widget.open();
  };

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
        cloudName: 'dadpqdwus',
        uploadPreset: 'viqz5h5f',
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
                          src={showuser.avatar !== undefined ? showuser.avatar : avatarDefault}
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
                      <divd className=" titular ">
                        <h3>{showuser.email}</h3>
                      </divd>
                      <div className="titular">
                        {showuser.city} {showuser.age} years old
                      </div>
                    </div>
                  </div>
                </div>
                {status === '' && (
                  <div className="btn-user-header ">
                    <div className="o-btn " onClick={this.handleInvite}>
                      INVITE ME
                    </div>
                  </div>
                )}

                {status === 'active' && (
                  <NavLink to={`/users/private-chat/${chatUser._id}`}>
                    <div className="o-btn">SAY ME SOMETHING</div>
                  </NavLink>
                )}
                {status === 'pending' && (
                  <div className="btn-user-header ">
                    <div className="o-btn is-disabled ">PENDING</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="edit">
                  <div>
                    <div onClick={this.props.handleLogout}>Logout</div>
                  </div>
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

                <div className="header">
                  <div className="header-wrapper">
                    <div className="avatar-content">
                      <img
                        className={edit ? 'border-active-editable' : 'border-active'}
                        onClick={() => {
                          this.showWidget(widget);
                        }}
                        src={avatar !== undefined ? avatar : avatarDefault}
                        alt=""
                      ></img>
                    </div>
                    <div className="details-content">
                      <div>
                        {userName} {lastName}
                      </div>
                      <div>{email}</div>
                      <div>{city}</div>
                      <div>{age} years old</div>
                    </div>
                  </div>
                </div>

                {edit && (
                  <form className="text-centered" onSubmit={this.handleFormSubmit}>
                    <div>
                      <input
                        type="text"
                        className="input input-filter"
                        placeholder="User Name"
                        name="userName"
                        value={userName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="input input-filter"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="input input-filter"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="City"
                        className="input input-filter"
                        name="city"
                        value={city}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Age"
                        className="input input-filter"
                        name="age"
                        value={age}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="flex-centered">
                      <input
                        onClick={this.handleFormSubmit}
                        className="action-btn-medium"
                        type="submit"
                        value="Update!"
                      />
                    </div>
                    <div className="margin-bottom"></div>
                  </form>
                )}
              </>
            )}
          </div>
        )}
        {loading && <div className="loader">Loading...</div>}
      </>
    );
  }
}

export default withAuth(UserMe);
