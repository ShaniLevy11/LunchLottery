import { useState } from 'react';
import { useLocation } from './hooks/useLocation';
import { fetchNearbyRestaurants, pickRandomRestaurant } from './services/api';
import Map from './components/Map';
import RestaurantCard from './components/RestaurantCard';
import SpinWheel from './components/SpinWheel';
import './App.css';

/**
 * Main App Component
 * 
 * This is the heart of the application. It orchestrates:
 * 1. Getting user's location via browser geolocation
 * 2. Fetching nearby restaurants from Geoapify API
 * 3. Randomly selecting one restaurant
 * 4. Displaying the result on a map
 * 
 * State Flow:
 * - idle: Initial state, waiting for user action
 * - locating: Getting user's GPS position
 * - searching: Fetching restaurants from API
 * - spinning: Animation while "randomly" selecting
 * - result: Showing the chosen restaurant
 * - error: Something went wrong
 */

function App() {
  // Custom hook for geolocation
  const { location, error: locationError, loading: locationLoading, getLocation } = useLocation();
  
  // App state
  const [appState, setAppState] = useState('idle'); // idle, locating, searching, spinning, result, error
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Main function that handles the entire flow:
   * 1. Get location (if not already available)
   * 2. Fetch restaurants
   * 3. Pick a random one
   */
  const handleFindRestaurant = async () => {
    setError(null);
    setSelectedRestaurant(null);
    
    // Step 1: Get location if we don't have it
    if (!location) {
      setAppState('locating');
      getLocation();
      return; // useEffect will continue the flow once location is available
    }
    
    // Step 2: Fetch restaurants
    await searchAndSelect(location);
  };

  /**
   * Fetches restaurants and selects one randomly
   */
  const searchAndSelect = async (loc) => {
    try {
      setAppState('searching');
      
      const nearbyRestaurants = await fetchNearbyRestaurants(loc.lat, loc.lon);
      setRestaurants(nearbyRestaurants);
      
      if (nearbyRestaurants.length === 0) {
        setError('No restaurants found nearby. Try a different location!');
        setAppState('error');
        return;
      }
      
      // Step 3: Spin animation then select
      setAppState('spinning');
      
      // Add suspense with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const chosen = pickRandomRestaurant(nearbyRestaurants);
      setSelectedRestaurant(chosen);
      setAppState('result');
      
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again.');
      setAppState('error');
    }
  };

  /**
   * Effect: When location becomes available after requesting it,
   * continue with the restaurant search
   */
  if (location && appState === 'locating') {
    searchAndSelect(location);
  }

  /**
   * Handle location errors
   */
  if (locationError && appState === 'locating') {
    setError(locationError);
    setAppState('error');
  }

  /**
   * Try again with a new random restaurant
   */
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

  /**
   * Reset everything and start fresh
   */
  const handleReset = () => {
    setAppState('idle');
    setSelectedRestaurant(null);
    setRestaurants([]);
    setError(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="title">🍴 בתאבון</h1>
        <p className="subtitle">End the "where should we eat?" debate forever!</p>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel - Controls and Restaurant Info */}
        <div className="left-panel">
          {/* Initial State */}
          {appState === 'idle' && (
            <div className="welcome-section">
              <div className="welcome-icon">🎰</div>
              <h2>Can't decide where to eat?</h2>
              <p>Let fate decide! We'll find restaurants near you and pick one at random.</p>
              <button className="primary-button" onClick={handleFindRestaurant}>
                🎲 Find Me a Restaurant!
              </button>
            </div>
          )}

          {/* Loading States */}
          {(appState === 'locating' || appState === 'searching') && (
            <div className="loading-section">
              <div className="loader"></div>
              <p>
                {appState === 'locating' 
                  ? '📍 Getting your location...' 
                  : '🔍 Searching for restaurants...'}
              </p>
            </div>
          )}

          {/* Spinning Animation */}
          {appState === 'spinning' && (
            <SpinWheel isSpinning={true} />
          )}

          {/* Result */}
          {appState === 'result' && selectedRestaurant && (
            <div className="result-section">
              <RestaurantCard restaurant={selectedRestaurant} />
              <div className="action-buttons">
                <button className="secondary-button" onClick={handleTryAgain}>
                  🎲 Pick Another
                </button>
                <button className="outline-button" onClick={handleReset}>
                  🔄 Start Over
                </button>
              </div>
              <p className="restaurant-count">
                Picked from {restaurants.length} nearby restaurants
              </p>
            </div>
          )}

          {/* Error State */}
          {appState === 'error' && (
            <div className="error-section">
              <div className="error-icon">😕</div>
              <p className="error-message">{error}</p>
              <button className="primary-button" onClick={handleFindRestaurant}>
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Map */}
        <div className="right-panel">
          <Map userLocation={location} restaurant={selectedRestaurant} />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Made with ❤️ to end all food arguments</p>
      </footer>
    </div>
  );
}

export default App;
