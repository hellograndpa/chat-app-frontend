/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import MapGL, { Layer, Source } from 'react-map-gl';
import getCoords from '../../../helpers/coordinates';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_TOKEN;

class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: 900,
      latitude: 42,
      longitude: 2.35,
      zoom: 8,
      doubleClickZoom: true,
    },
  };

  componentDidMount = async () => {
    // const {
    //   coords: { latitude, longitude },
    // } = await getCoords();
    // const { viewport } = { ...this.state };
    // viewport.latitude = latitude;
    // viewport.longitude = longitude;
    // this.setState(viewport);
  };

  render() {
    const { viewport } = this.state;
    const { rooms } = this.props;
    console.log('TCL: Map -> render -> rooms', rooms);

    const features = rooms.map(room => {
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [room.location.coordinates[0], room.location.coordinates[1]] },
      };
    });
    const geojson = {
      type: 'FeatureCollection',
      features,
    };

    return (
      <div style={{ margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Your location is:</h1>
        <MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/streets-v11">
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer
              id="point"
              type="circle"
              paint={{
                'circle-radius': 10,
                'circle-color': '#007cbf',
              }}
            />
          </Source>
        </MapGL>
      </div>
    );
  }
}
export default Map;
