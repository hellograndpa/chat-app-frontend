/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import WebMercatorViewport from 'viewport-mercator-project';
import MapGL, { Layer, Source, GeolocateControl } from 'react-map-gl';

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
    const { rooms } = this.props;
    let maxValueLat = 0;
    let minValueLat = 0;
    let maxValueLong = 0;
    let minValueLong = 0;

    if (rooms) {
      maxValueLat = Math.max(...rooms.map(room => room.location.coordinates[0]));
      minValueLat = Math.min(...rooms.map(room => room.location.coordinates[0]));
      maxValueLong = Math.max(...rooms.map(room => room.location.coordinates[1]));
      minValueLong = Math.min(...rooms.map(room => room.location.coordinates[1]));
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
        ...this.state.viewport,
        longitude,
        latitude,
        zoom,
      },
    });
  };

  mapRef = React.createRef();

  componentDidMount() {
    this.setInitialBounds();
  }

  render() {
    const { rooms } = this.props;
    const { viewport } = this.state;

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
      <div style={{ margin: '0 auto', width: '800' }}>
        <h1 style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>Your location is:</h1>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Source id="my-data" type="geojson" data={geojson}>
            <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
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
