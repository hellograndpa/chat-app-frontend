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
    const { locations } = this.props;

    let maxValueLat = 3;
    let minValueLat = 2;
    let maxValueLong = 5;
    let minValueLong = 3;

    if (locations.length > 0) {
      maxValueLat = Math.max(...locations.map(locations => locations.location.coordinates[0]));
      minValueLat = Math.min(...locations.map(locations => locations.location.coordinates[0]));
      maxValueLong = Math.max(...locations.map(locations => locations.location.coordinates[1]));
      minValueLong = Math.min(...locations.map(locations => locations.location.coordinates[1]));
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

  componentDidUpdate(prevProps) {
    if (prevProps.locations !== this.props.locations) {
      this.setInitialBounds();
    }
  }

  render() {
    const { locations } = this.props;
    const { viewport } = this.state;
    let features = [];
    let geojson = {};
    if (locations !== []) {
      features = locations.map(item => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [item.location.coordinates[0], item.location.coordinates[1]],
          },
        };
      });
      geojson = {
        type: 'FeatureCollection',
        features,
      };
    }

    return (
      <div style={{ margin: '0 auto', width: 'auto' }}>
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
