/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import WebMercatorViewport from 'viewport-mercator-project';
import MapGL, { Layer, Source } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_TOKEN;

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight - 200,
    },
  };

  setInitialBounds = () => {
    console.log('TCL: Map -> setInitialBounds -> rooms', this.props.rooms);
    const { rooms } = this.props;

    let maxValueLat = 3;
    let minValueLat = 2;
    let maxValueLong = 5;
    let minValueLong = 3;

    if (rooms.length > 0) {
      maxValueLat = Math.max(...rooms.map(room => room.location.coordinates[0]));
      minValueLat = Math.min(...rooms.map(room => room.location.coordinates[0]));
      maxValueLong = Math.max(...rooms.map(room => room.location.coordinates[1]));
      minValueLong = Math.min(...rooms.map(room => room.location.coordinates[1]));
    } else {
      maxValueLat = 3;
      minValueLat = -5;
      maxValueLong = 44;
      minValueLong = 35;
    }

    const viewport = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight - 200,
    });
    const { longitude, latitude, zoom } = viewport.fitBounds(
      [[minValueLat, maxValueLong], [maxValueLat, minValueLong]],
      {
        padding: 60,
        offset: [0, -100],
      },
    );

    this.setState({
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight - 200,
        longitude,
        latitude,
        zoom,
      },
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.setInitialBounds);
    this.setInitialBounds();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialBounds);
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.rooms !== this.props.rooms) {
  //     this.setInitialBounds();
  //     return true;
  //   }
  //   return false;
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.rooms !== this.props.rooms) {
      this.setInitialBounds();
    }
  }

  render() {
    const { rooms } = this.props;
    console.log('TCL: Map -> render -> rooms', rooms);
    const { viewport } = this.state;
    console.log('TCL: Map -> render -> viewport', viewport);
    let features = [];
    let geojson = {};
    if (rooms !== []) {
      features = rooms.map(room => {
        return {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [room.location.coordinates[0], room.location.coordinates[1]] },
        };
      });
      geojson = {
        type: 'FeatureCollection',
        features,
      };
    }

    return (
      <div style={{ margin: '0 auto', width: '800' }}>
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
