/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import userService from '../../../services/userService';
import { getCoords } from '../../../helpers/coordinates';
import ChatUserService from '../../../services/chatUserService';
import { withAuth } from '../../../Context/AuthContext';

// Components
import FileUpload from '../../../components/FileUpload';

import avatarDefault from '../../../images/avatar.svg';

class UserMe extends Component {
  state = {
    userName: null,
    lastName: null,
    email: null,
    city: null,
    age: null,
    edit: false,
    valueButton: 'Edit user',
    upload: false,
    valueUploadBtn: 'Edit image',
    pictures: [],
  };

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  handleInvite = () => {
    const { user, showuser } = this.props;
    const body = { userChat01: user._id, userChat02: showuser._id };
    ChatUserService.createChatUser(body);
  };

  handleEdit = e => {
    this.setState({
      edit: !this.state.edit,
      valueButton: 'Cancel editon',
    });
  };

  handleUpload = () => {
    this.setState({
      upload: !this.state.upload,
      // valueUploadBtn: 'Upload image',
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
    });
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

  onFormImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', this.state.pictures[0]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post('/upload', formData, config)
      .then(response => {
        alert('The file is successfully uploaded');
      })
      .catch(error => {});
  }

  componentDidMount = () => {
    this.handleUserGet(this.props.user);
  };

  showWidget = widget => {
    widget.open();
  };

  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dadpqdwus',
        uploadPreset: 'fepkp7k0',
      },
      (error, result) => {},
    );
    console.log(widget);

    const { user, showuser } = this.props;
    const { edit, userName, lastName, email, age, city, valueButton, upload, valueUploadBtn } = this.state;
    const checked = edit ? 'checked' : '';
    return (
      <div className="user">
        {user._id !== showuser._id ? (
          <>
            <div>Name {showuser.userName}</div>
            <div>Last Name {showuser.lastName}</div>
            <div>Email {showuser.email}</div>
            <div>Last theme {showuser.userName}</div>

            <div>
              Avatar <img src="" alt=""></img> {showuser.userName}
            </div>

            <button onClick={this.handleInvite()}>Invitar</button>
          </>
        ) : (
          <></>
        )}

        <>
          <div className="edit">
            <div className="edit-mode-text">Edit Mode:</div>
            <div className="edit-mode-switch">
              <label className="switch">
                <input type="checkbox" checked={checked} onChange={this.handleEdit} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="header">
            <div className="header-wrapper">
              <div className="avatar-content border-active">
                <img src={avatarDefault} alt=""></img>
                {edit && (
                  <div className="edit-avatar-btn-wrapper">
                    <button
                      className="edit-avatar-btn"
                      value={valueUploadBtn}
                      onClick={() => {
                        this.showWidget(widget);
                      }}
                    >
                      {valueUploadBtn}
                    </button>
                  </div>
                )}
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
        </>
        {!upload && edit && (
          <>
            <form onSubmit={this.handleFormSubmit}>
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
                <input onClick={this.handleFormSubmit} className="action-btn-medium" type="submit" value="Update!" />
              </div>
              <div className="margin-bottom"></div>
            </form>
          </>
        )}
        {upload && (
          <form>
            <ImageUploader
              withIcon={false}
              buttonText="Choose a new image"
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              singleImage={true}
              withPreview={true}
            />

            <div className="flex-centered">
              <input onClick={this.handleFormSubmit} className="action-btn-medium" type="submit" value="Update!" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default withAuth(UserMe);
