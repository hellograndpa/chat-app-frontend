/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Moment from 'react-moment';
import { withAuth } from '../../../Context/AuthContext';

// Services
import RoomService from '../../../services/roomService';

class RoomsDetails extends Component {
  state = {
    ...this.props,
    editMode: false,
  };

  handleEditMode = () => {
    const { editMode } = this.state;
    this.setState({ editMode: !editMode });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeTheme = e => {
    this.setState({
      theme: e.target.value,
    });
  };

  checkUploadResult = async resultEvent => {
    if (resultEvent.event === 'success') {
    }
  };

  showWidget = widget => {
    widget.open();
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    const { _id, roomName, description, adminList, userBanList, avatar, city, theme } = this.state;
    await RoomService.updateRoom({
      _id,
      roomName,
      description,
      adminList,
      userBanList,
      avatar,
      city,
      theme,
    });
    this.setState({ editMode: false });
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

    const {
      editMode,
      roomName,
      description,
      adminList,
      avatar,
      city,
      theme,
      activeUsers,
      participatedUsers,
      chat,
    } = this.state;
    const checked = editMode ? 'checked' : '';

    return (
      <div className="bg-color-white">
        <div className="title">
          <h1>Room Details</h1>
        </div>
        <div>
          {adminList[0]._id === this.props.user._id && (
            <div className="edit">
              <div className="edit-mode-text">Edit Mode: </div>
              <div className="edit-mode-switch">
                <label className="switch">
                  <input type="checkbox" checked={checked} onChange={this.handleEditMode} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}
          <div className="header-user header-user__greycolor header-user__room-header">
            <div className="o-avatar is-active w-50precent is-headerUser-absolute ">
              <div className="o-avatar__inner">
                <img
                  className={editMode ? 'o-avatar__img border-active-editable' : 'o-avatar__img border-active'}
                  onClick={() => {
                    this.showWidget(widget);
                  }}
                  src={avatar !== undefined ? avatar : ''}
                  alt=""
                />
              </div>
            </div>

            {!editMode ? (
              <div className="details-content">
                <div className="titular">
                  <h1>{roomName}</h1>
                  <p>{description}</p>
                </div>
                <div className="titular titular__no-padding">
                  <div className="theme">
                    {theme} {city}
                  </div>
                </div>
                <div>
                  <h2 className="titular titular__no-padding">
                    Active now: {activeUsers.length} Participate: {participatedUsers.length}
                  </h2>
                </div>
                <div className="titular titular__no-padding">
                  <h5>
                    Conversations: {chat.conversation.length} - Last:{' '}
                    <Moment format="DD/MM/YY hh:mm">{chat.updated_at}</Moment>
                  </h5>
                </div>
              </div>
            ) : (
              <div className="details-content">
                <form name="frm" onSubmit={this.handleOnSubmit}>
                  <div className="titular">
                    <input
                      type="text"
                      className="input input-filter"
                      placeholder="Room Name"
                      name="roomName"
                      maxLength="35"
                      value={roomName}
                      onChange={this.handleOnChange}
                    />
                    <textarea
                      className="input input-textarea"
                      placeholder="Description"
                      name="description"
                      maxLength="250"
                      value={description}
                      onChange={this.handleOnChange}
                    />
                    <input
                      type="text"
                      className="input input-filter user-city"
                      placeholder="City"
                      name="city"
                      onChange={this.handleOnChange}
                      value={city}
                    />
                    <select
                      name="theme"
                      className="select-css-white"
                      defaultValue={this.state.theme}
                      onChange={this.handleChangeTheme}
                    >
                      <option value="Sports">Development</option>
                      <option value="News">News</option>
                      <option value="Party">Party</option>
                      <option value="Travel">Travel</option>
                      <option value="Sports">Sports</option>
                      <option value="Sports">Music</option>
                      <option value="Sports">Jobs</option>
                    </select>
                  </div>
                  <input className="action-btn-medium" type="submit" value="Modify!" />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(RoomsDetails);
