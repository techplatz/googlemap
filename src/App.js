import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Polyline,
} from 'react-google-maps';
import * as addressData from './data/address.json';

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const linedis = addressData.Abfrage1.map((address) => {
    const position = {
      lat: address.coordinates[0],
      lng: address.coordinates[1],
    };
    return position;
  });

  console.log(linedis);

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 51.502880, lng: 6.551710 }}>
      {addressData.Abfrage1.map((address) => (
        <Marker
          key={address.ID}
          position={{
            lat: address.coordinates[0],
            lng: address.coordinates[1],
          }}
          onClick={() => {
            setSelectedPark(address);
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.coordinates[0],
            lng: selectedPark.coordinates[1],
          }}
        >
          <div>
            <h2>{selectedPark.ORTSBEZEIC}</h2>
            <p>{selectedPark.STRASSENNA}</p>
          </div>
        </InfoWindow>
      )}

      <Polyline
        path={linedis}
        
        geodesic={true}
        options={{
          strokeColor: 'green',
          strokeOpacity: 0.75,
          strokeWeight: 4,
          icons: [
            {
              offset: '0',
              repeat: '20px',
            },
          ],
        }}
      />
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: '50vw', height: '50vh' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
