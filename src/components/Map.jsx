import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const restaurantIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapController = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 16, {
        duration: 1.5  // Smooth animation duration in seconds
      });
    }
  }, [center, map]);
  
  return null;
};

const Map = ({ userLocation, restaurant }) => {
  const restaurantCoords = restaurant?.geometry?.coordinates;
  const restaurantProps = restaurant?.properties;
  
  // Default center (Tel Aviv) if no user location yet
  const defaultCenter = [32.0853, 34.7818];
  const center = userLocation 
    ? [userLocation.lat, userLocation.lon] 
    : defaultCenter;

  const restaurantPosition = restaurantCoords 
    ? [restaurantCoords[1], restaurantCoords[0]] 
    : null;

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      >
        {}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {}
        <MapController center={restaurantPosition} />
        
        {}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
            <Popup>
              <strong>📍 You are here</strong>
            </Popup>
          </Marker>
        )}
        
        {}
        {restaurantPosition && (
          <Marker position={restaurantPosition} icon={restaurantIcon}>
            <Popup>
              <strong>🍽️ {restaurantProps?.name || 'Restaurant'}</strong>
              <br />
              {restaurantProps?.address_line2 || 'No address available'}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
