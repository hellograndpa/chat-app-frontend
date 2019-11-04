/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import MapGL, { Marker, GeolocateControl } from 'react-map-gl';
import getCoords from '../../../helpers/coordinates';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_TOKEN;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: '100%',
        height: 900,
        latitude: 0,
        longitude: 0,
        zoom: 8,
      },
    };
  }

  async componentDidMount() {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const { viewport } = { ...this.state };
    viewport.latitude = latitude;
    viewport.longitude = longitude;
    this.setState(viewport);
  }

  render() {
    const { viewport } = this.state;
    return (
      <div style={{ margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Your location is:</h1>
        <MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v11">
          <GeolocateControl />
          <Marker longitude={this.state.viewport.longitude} latitude={this.state.viewport.latitude}>
            <img src="/images/marker_ico.svg" width="50"></img>
          </Marker>
        </MapGL>
      </div>
    );
  }
}
export default Map;
