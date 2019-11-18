/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getCoords } from '../../../helpers/coordinates';
import RoomService from '../../../services/roomService';

// Context
import { withNotification } from '../../../Context/NotificationCtx';

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
    await RoomService.createRoom(body);

    this.props.handleSetMessage({ typeMessage: 'info', message: 'Room created correctly' });

    // Go to the room created
    this.props.closeLayer();

    this.inputRoomName.value = '';
    this.inputDescription.value = '';
    this.inputCity.value = '';
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
        cloudName: 'dldvty15u',
        uploadPreset: 'ggbp4y7j',
      },
      (error, result) => {
        this.checkUploadResult(result);
      },
    );
    return (
      <div className="room-create">
        <div className="flex-centered">
          <form name="frmRoom" onSubmit={this.handleSubmit} method="POST">
            <div>
              <input
                placeholder="Room's Name 30 cacaters"
                className="input input-filter"
                type="text"
                name="roomName"
                maxLength="35"
                ref={userInput => (this.inputRoomName = userInput)}
              ></input>
            </div>
            <div>
              <textarea
                className="input input-textarea"
                placeholder="Write a description"
                name="description"
                maxLength="250"
                ref={userInput => (this.inputDescription = userInput)}
              ></textarea>
            </div>
            <div className="">
              <select placeholder="Select a theme" className="select-css-dark" name="theme">
                <option value="">Select Theme</option>
                <option value="Sports">Development</option>
                <option value="News">News</option>
                <option value="Party">Party</option>
                <option value="Travel">Travel</option>
                <option value="Sports">Sports</option>
                <option value="Sports">Music</option>
                <option value="Sports">Jobs</option>
              </select>
            </div>
            <div>
              <input
                className="input input-filter"
                ref={userInput => (this.inputCity = userInput)}
                type="text"
                name="city"
                placeholder="City"
              ></input>
            </div>

            {roomImage === '' && (
              <div
                onClick={e => {
                  e.preventDefault();
                  this.showWidget(widget);
                }}
                className="button-image ripple"
              >
                Upload an image
              </div>
            )}
            {roomImage !== '' && (
              <div className="flex-centered">
                <div className="image-wrapper">
                  <div className="o-images ">
                    <div className="o-images__inner">
                      <img className="o-images__img" src={roomImage} alt="" />
                    </div>
                  </div>
                </div>
                <div className="button-wrapper">
                  <div className="flex-centered">
                    <input className="action-btn-medium" type="submit" value="Create!" />
                  </div>
                </div>
              </div>
            )}
            <input type="hidden" name="avatar" value={roomImage}></input>

            {roomImage === '' && (
              <div className="button-wrapper">
                <div className="flex-centered">
                  <input className="action-btn-medium" type="submit" value="Create!" />
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="margin-bottom"></div>
      </div>
    );
  }
}

export default withNotification(withRouter(RoomCreate));
