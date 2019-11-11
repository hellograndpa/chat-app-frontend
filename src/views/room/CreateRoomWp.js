/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import RoomCreate from './components/RoomCreate';
import Map from './components/Map';
import { getCoords } from '../../helpers/coordinates';

class CreateRoomWp extends Component {
  state = {
    location: [{ location: { coordinates: [0, 0] } }],
  };

  async componentDidMount() {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const location = [{ location: { coordinates: [latitude, longitude] } }];
    this.setState({ location });
  }

  render() {
    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        <div className="o-top-nav o-top-nav--rel">
          <a href="#s1" className="o-top-nav__btn || o-btn">
            Prev
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            Next
          </a>
        </div>
        <div className="slider">
          <RoomCreate></RoomCreate>
          <div>
            <div className="title">
              <h1>Room position</h1>
            </div>
            <div>
              <Map locations={this.state.location}></Map>
            </div>
          </div>
        </div>
        <div className="prevNext">
          <div>
            <a href="#s1"></a>
            <a href="#s2">
              <div className="arrowed">
                <div className="arrow-R"></div>
              </div>
            </a>
          </div>
          <div>
            <a href="#s1">
              <div className="arrowed">
                <div className="arrow-L"></div>
              </div>
            </a>
            <a href="#s2"></a>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRoomWp;
