/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WebMercatorViewport from 'viewport-mercator-project';
import MapGL, { Layer, Source } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = process.env.REACT_APP_TOKEN;

class Map extends Component {
  _isMounted = false;

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight - 100,
    },
  };

  setInitialBounds = () => {
    const { locations } = this.props;

    let maxValueLat = 3;
    let minValueLat = 2;
    let maxValueLong = 5;
    let minValueLong = 3;

    if (locations.length > 0) {
      maxValueLat = Math.max(...locations.map(loc => loc.location.coordinates[0]));
      minValueLat = Math.min(...locations.map(loc => loc.location.coordinates[0]));
      maxValueLong = Math.max(...locations.map(loc => loc.location.coordinates[1]));
      minValueLong = Math.min(...locations.map(loc => loc.location.coordinates[1]));
    } else {
      maxValueLat = 3;
      minValueLat = -5;
      maxValueLong = 44;
      minValueLong = 35;
    }

    const viewport = new WebMercatorViewport({
      width: window.innerWidth,
      height: window.innerHeight - 220,
    });
    const { longitude, latitude, zoom } = viewport.fitBounds(
      [[minValueLat, maxValueLong], [maxValueLat, minValueLong]],
      {
        padding: 60,
        offset: [0, -100],
      },
    );

    if (this._isMounted) {
      this.setState({
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight - 220,
          longitude,
          latitude,
          zoom,
        },
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('resize', this.setInitialBounds);
    this.setInitialBounds();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setInitialBounds);
  }

  componentDidUpdate(prevProps) {
    if (this._isMounted && prevProps.locations !== this.props.locations) {
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

Map.propTypes = {
  locations: PropTypes.array,
};

export default Map;
