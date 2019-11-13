/* eslint-disable react/prop-types */
import React, { Component } from 'react';

// Services
import RoomService from '../../../services/roomService';

// Components
import FileUpload from '../../../components/FileUpload';

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
    const { roomName, description, adminList, userBanList, avatar, city, theme } = this.state;
    const { editMode } = this.state;
    return (
      <div>
        {editMode && (
          <div>
            <form name="frm" onSubmit={this.handleOnSubmit}>
              <button onClick={this.handleEditMode}>Edit mode off</button>
              <div>
                Room Name: <input type="text" name="roomName" value={roomName} onChange={this.handleOnChange} />
              </div>
              <div>
                Description: <input type="text" name="description" value={description} onChange={this.handleOnChange} />
              </div>
              <div>
                AdminList:
                <br />
                <ul>
                  {adminList.map(user => {
                    return (
                      <li key={user._id}>
                        {user.userName} <button>quitar</button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                userBanList:
                <br />
                <ul>
                  {userBanList.map(user => {
                    return (
                      <li key={user._id}>
                        {user.userName}
                        <button>quitar</button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                avatar:
                <FileUpload />
              </div>
              <div>
                City: <input type="text" name="city" onChange={this.handleOnChange} value={city} />
              </div>
              <div>
                Theme:
                <select name="theme" defaultValue={this.state.theme} onChange={this.handleChangeTheme}>
                  <option value="Travel">Travel</option>
                  <option value="Party">Party</option>
                  <option value="News">News</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Pets">Pets</option>
                </select>
              </div>
              <input type="submit" value="Send"></input>
            </form>
          </div>
        )}
        {!editMode && (
          <div>
            <button onClick={this.handleEditMode}>Edit mode on</button>
            <div>Room Name: {roomName}</div>
            <div>Description: {description}</div>
            <div>
              AdminList:
              <br />
              <ul>
                {adminList.map(user => {
                  return <li key={user._id}>{user.userName}</li>;
                })}
              </ul>
            </div>
            <div>
              userBanList:
              <br />
              <ul>
                {userBanList.map(user => {
                  return <li key={user._id}>{user.userName}</li>;
                })}
              </ul>
            </div>
            <div>avatar: {avatar}</div>
            <div>City:{city}</div>
            <div>Theme:{theme}</div>
          </div>
        )}
      </div>
    );
  }
}

export default RoomsDetails;
