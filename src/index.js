// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map';
import './style.css';

const googleMapsApiKey = 'AIzaSyDGQQVlD5svZXeQVJZwruLwlEB5vzmUWyg';

const App = (props) => {
  const { places } = props;

  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom,
  } = props;

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={places}
      loadingElement={loadingElement || <div style={{ height: `100%` }} />}
      containerElement={containerElement || <div style={{ height: '80vh' }} />}
      mapElement={mapElement || <div style={{ height: `100%` }} />}
      defaultCenter={defaultCenter || { lat: 51.502880, lng: 6.551710 }}
      defaultZoom={defaultZoom || 11}
    />
  );
};

const places = [
  { latitude: 51.457909, longitude: 7.013860 },
  { latitude: 51.469580, longitude: 6.865970 },
  { latitude: 51.435150, longitude: 6.762690 },
];

render(
  <App defaultZoom={7} places={places} />,
  document.getElementById('root')
);
