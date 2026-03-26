import { useState, useEffect } from 'react';
import { useLocation } from './hooks/useLocation';
import { fetchNearbyRestaurants, pickRandomRestaurant } from './services/api';
import Map from './components/Map';
import RestaurantCard from './components/RestaurantCard';
import SpinWheel from './components/SpinWheel';
import './App.css';

/**
 * Main App Component - Hebrew Version
 * 
 * New Flow:
 * 1. Start with a centered hero button (no map visible)
 * 2. After picking a restaurant, reveal the map and details
 */

// Floating food emojis for background decoration
const FloatingEmojis = () => {
  const emojis = ['🍕', '🍔', '🍣', '🍜', '🥗', '🍝', '🌮', '🥘', '🍱', '🍛'];
  
  return (
    <div className="floating-emojis">
      {emojis.map((emoji, i) => (
        <span
          key={i}
          className="floating-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

function App() {
  const { location, error: locationError, getLocation } = useLocation();
  
  const [appState, setAppState] = useState('idle');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [error, setError] = useState(null);

  const handleFindRestaurant = async () => {
    setError(null);
    setSelectedRestaurant(null);
    
    if (!location) {
      setAppState('locating');
      getLocation();
      return;
    }
    
    await searchAndSelect(location);
  };

  const searchAndSelect = async (loc) => {
    try {
      setAppState('searching');
      
      const nearbyRestaurants = await fetchNearbyRestaurants(loc.lat, loc.lon);
      setRestaurants(nearbyRestaurants);
      
      if (nearbyRestaurants.length === 0) {
        setError('לא נמצאו מסעדות בקרבת מקום. נסה שוב!');
        setAppState('error');
        return;
      }
      
      setAppState('spinning');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const chosen = pickRandomRestaurant(nearbyRestaurants);
      setSelectedRestaurant(chosen);
      setAppState('result');
      
    } catch (err) {
      setError('שגיאה בטעינת מסעדות. נסה שוב.');
      setAppState('error');
    }
  };

  // Effect: When location becomes available after requesting it, continue with the search
  useEffect(() => {
    if (location && appState === 'locating') {
      searchAndSelect(location);
    }
  }, [location, appState]);

  // Effect: Handle location errors
  useEffect(() => {
    if (locationError && appState === 'locating') {
      setError(locationError);
      setAppState('error');
    }
  }, [locationError, appState]);

  const handleTryAgain = async () => {
    if (restaurants.length > 0) {
      setAppState('spinning');
      await new Promise(resolve => setTimeout(resolve, 1500));
      const chosen = pickRandomRestaurant(restaurants);
      setSelectedRestaurant(chosen);
      setAppState('result');
    } else {
      handleFindRestaurant();
    }
  };

  const handleReset = () => {
    setAppState('idle');
    setSelectedRestaurant(null);
    setRestaurants([]);
    setError(null);
  };

  // Check if we should show the result view (with map)
  const showResultView = appState === 'result' && selectedRestaurant;

  return (
    <div className={`app animated-bg ${showResultView ? 'result-view' : 'hero-view'}`}>
      <FloatingEmojis />
      
      {}
      {!showResultView && (
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">🍴 בתאבון</h1>
            <p className="hero-subtitle">נמאס לכם לריב על איפה לאכול?</p>
            
            {}
            {appState === 'idle' && (
              <div className="hero-action">
                <button className="mega-button" onClick={handleFindRestaurant}>
                  <span className="mega-button-icon">🎲</span>
                  <span className="mega-button-text">בחר לי מסעדה!</span>
                </button>
                <p className="hero-hint">לחץ ותן לגורל להחליט</p>
              </div>
            )}

            {}
            {(appState === 'locating' || appState === 'searching') && (
              <div className="hero-loading">
                <div className="loader-large"></div>
                <p className="loading-text">
                  {appState === 'locating' 
                    ? '📍 מאתר את המיקום שלך...' 
                    : '🔍 מחפש מסעדות בסביבה...'}
                </p>
              </div>
            )}

            {}
            {appState === 'spinning' && (
              <SpinWheel isSpinning={true} />
            )}

            {}
            {appState === 'error' && (
              <div className="hero-error">
                <div className="error-icon">😕</div>
                <p className="error-message">{error}</p>
                <button className="primary-button" onClick={handleFindRestaurant}>
                  נסה שוב
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RESULT VIEW - Map + Details */}
      {showResultView && (
        <div className="result-container">
          <header className="result-header">
            <h1 className="result-title">🍴 בתאבון</h1>
          </header>

          <main className="result-content">
            <div className="result-card-panel">
              <RestaurantCard restaurant={selectedRestaurant} />
              <div className="action-buttons">
                <button className="secondary-button" onClick={handleTryAgain}>
                  🎲 בחר אחרת
                </button>
                <button className="outline-button" onClick={handleReset}>
                  🔄 התחל מחדש
                </button>
              </div>
              <p className="restaurant-count">
                נבחר מתוך {restaurants.length} מסעדות בסביבה
              </p>
            </div>

            <div className="result-map-panel">
              <Map userLocation={location} restaurant={selectedRestaurant} />
            </div>
          </main>

          <footer className="footer">
            <p>נבנה עם ❤️ כדי לסיים ויכוחים על אוכל</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
