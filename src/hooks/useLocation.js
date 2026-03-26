import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    // Check if supported by the browser
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
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 600000
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
