import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        setError(getErrorMessage(err.code));
        setLoading(false);
      },
      {
        enableHighAccuracy: true,  // Request precise location
        timeout: 10000,            // Wait up to 10 seconds
        maximumAge: 300000         // Accept cached position up to 5 minutes old
      }
    );
  }, []);

  return { location, error, loading, getLocation };
};

const getErrorMessage = (code) => {
  switch (code) {
    case 1:
      return 'Location access denied. Please enable location permissions.';
    case 2:
      return 'Unable to determine your location. Please try again.';
    case 3:
      return 'Location request timed out. Please try again.';
    default:
      return 'An unknown error occurred.';
  }
};
