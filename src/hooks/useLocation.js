import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError('הדפדפן שלך לא תומך באיתור מיקום');
      return;
    }

    setLoading(true);
    setError(null);

    console.log('Requesting location...');

    // Request the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location received:', position.coords);
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(getErrorMessage(err.code));
        setLoading(false);
      },
      {
        enableHighAccuracy: false,  // Set to false for faster response
        timeout: 15000,             // Wait up to 15 seconds
        maximumAge: 600000          // Accept cached position up to 10 minutes old
      }
    );
  }, []);

  return { location, error, loading, getLocation };
};

const getErrorMessage = (code) => {
  switch (code) {
    case 1:
      return 'הגישה למיקום נדחתה. אנא אפשר גישה למיקום בהגדרות הדפדפן.';
    case 2:
      return 'לא ניתן לזהות את המיקום שלך. נסה שוב.';
    case 3:
      return 'בקשת המיקום נכשלה (timeout). נסה שוב.';
    default:
      return 'שגיאה לא ידועה באיתור מיקום.';
  }
};
