/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getCoords } from '../../../helpers/coordinates';
import RoomService from '../../../services/roomService';

class RoomCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    roomImage: '',
  };

  async handleSubmit(e) {
    e.preventDefault();

    console.log(e);
    // Get date from form
    const {
      roomName: { value: roomName },
      description: { value: description },
      theme: { value: theme },
      avatar: { value: avatar },
      city: { value: city },
    } = e.target;

    // Get Coords
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const body = { roomName, description, latitude, longitude, theme, avatar, city };

    // Create Room
    const created = await RoomService.createRoom(body);

    // Go to the room created
    console.log(this);
    this.props.history.push(`/rooms/${created._id}`);
  }

  showWidget = widget => {
    widget.open();
  };

  checkUploadResult(resultEvent) {
    if (resultEvent.event === 'success') {
      this.setState({ roomImage: resultEvent.info.secure_url });
    }
  }

  render() {
    const { roomImage } = this.state;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dadpqdwus',
        uploadPreset: 'viqz5h5f',
      },
      (error, result) => {
        this.checkUploadResult(result);
      },
    );
    return (
      <div className="room-create">
        <div className="title">
          <h1>Create a Room</h1>
        </div>
        <div className="flex-centered">
          <form name="frmRoom" onSubmit={this.handleSubmit} method="POST">
            <div>
              <input placeholder="Room's Name" className="input input-filter" type="text" name="roomName"></input>
            </div>
            <div>
              <textarea
                className="input input-textarea"
                placeholder="Write a description"
                name="description"
              ></textarea>
            </div>
            <div className="">
              <select placeholder="Select a theme" className="select-css-white" name="theme">
                <option value="">Select Theme</option>
                <option value="News">News</option>
                <option value="Party">Party</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div>
              <input className="input input-filter" type="text" name="city" placeholder="City"></input>
            </div>
            <div>
              {roomImage === '' && (
                <button
                  onClick={e => {
                    e.preventDefault();
                    this.showWidget(widget);
                  }}
                  className="button-image ripple"
                >
                  Upload an image
                </button>
              )}
              <img className="image" src={roomImage}></img>
              <input type="hidden" name="avatar" value={roomImage}></input>
            </div>

            <div className="button-wrapper">
              <div className="flex-centered">
                <input className="action-btn-medium" type="submit" value="Create!" />
              </div>
            </div>
          </form>
        </div>
        <div className="margin-bottom"></div>
      </div>
    );
  }
}

export default withRouter(RoomCreate);
