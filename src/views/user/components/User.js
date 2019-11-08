/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import userService from '../../../services/userService';
import { getCoords } from '../../../helpers/coordinates';
import ChatUserService from '../../../services/chatUserService';
import { withAuth } from '../../../Context/AuthContext';

class UserMe extends Component {
  state = {
    userName: null,
    lastName: null,
    email: null,
    city: null,
    age: null,
    edit: false,
    valueButton: 'Edit user',
  };

  handleInvite = () => {
    const { user, showuser } = this.props;
    const body = { userChat01: user._id, userChat02: showuser._id };
    ChatUserService.createChatUser(body);
  };

  handleEdit = e => {
    if (e.target.value === 'Edit user') {
      this.setState({
        edit: true,
        valueButton: 'Cancel editon',
      });
    } else {
      this.setState({
        edit: false,
        valueButton: 'Edit user',
      });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleUserGet = async user => {
    const newUser = await userService.getUserById(user._id);
    this.setState({
      userName: newUser.userName,
      lastName: newUser.userName,
      email: newUser.userName,
      city: newUser.userName,
      age: newUser.userName,
    });
    console.log('TCL: UserMe -> newUser', newUser);
    console.log('TCL: UserMe -> this.setState', this.state);
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const { _id, userName, lastName, email, age, city } = this.state;
    await userService.updateUser(_id, userName, lastName, email, age, city, latitude, longitude);
    this.setState({
      edit: false,
    });
    this.handleUserGet(this.props.user);
  };

  componentDidMount = () => {
    this.handleUserGet(this.props.user);
  };

  render() {
    const { user, showuser } = this.props;
    const { edit, userName, lastName, email, age, city, valueButton } = this.state;

    return (
      <div>
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

        {!edit && (
          <>
            <button value={valueButton} onClick={this.handleEdit}>
              {valueButton}
            </button>
            <div>Name {userName}</div>
            <div>Last Name {lastName}</div>
            <div>Email {email}</div>
            <div>City {city}</div>
            <div>Age {age}</div>

            <div>
              Avatar <img src="" alt=""></img> {showuser.userName}
            </div>
          </>
        )}
        {edit && (
          <>
            <button value={valueButton} onClick={this.handleEdit}>
              {valueButton}
            </button>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" name="userName" value={userName} onChange={this.handleChange} />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
              </div>
              <div>
                <label>Email</label>
                <input type="text" name="email" value={email} onChange={this.handleChange} />
              </div>
              <div>
                <label>City</label> <input type="text" name="city" value={city} onChange={this.handleChange} />
              </div>
              <div>
                <label>Age</label>Age <input type="text" name="age" value={age} onChange={this.handleChange} />
              </div>
              <button onClick={this.handleFormSubmit}> Updata me </button>
            </form>
            <div>
              <label>Avatar</label> <img src="" alt=""></img> {userName}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(UserMe);
