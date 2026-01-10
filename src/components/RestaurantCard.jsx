const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

  const props = restaurant.properties;
  
  const formatDistance = (meters) => {
    if (!meters) return null;
    if (meters < 1000) {
      return `${Math.round(meters)} מטר`;
    }
    return `${(meters / 1000).toFixed(1)} ק"מ`;
  };

  // Build a complete address with street number
  const getFullAddress = () => {
    // Try address_line1 first (usually includes street + number)
    if (props.address_line1 && props.address_line1 !== props.name) {
      return props.address_line1;
    }
    
    // Build from components: "Street Name 123, City"
    let address = '';
    
    if (props.street) {
      address = props.street;
      if (props.housenumber) {
        address += ` ${props.housenumber}`;
      }
    }
    
    // Add city if we have it
    if (props.city) {
      address += address ? `, ${props.city}` : props.city;
    }
    
    // Fallback to address_line2 if nothing else works
    return address || props.address_line2 || null;
  };

  // Get cuisine type from categories
  const getCuisineType = () => {
    if (props.categories) {
      const cuisineCategory = props.categories.find(cat => 
        cat.includes('cuisine') || cat.includes('catering')
      );
      if (cuisineCategory) {
        return cuisineCategory.split('.').pop().replace(/_/g, ' ');
      }
    }
    return 'restaurant';
  };

  const getCuisine = () => {
    const cuisine = getCuisineType();
    return cuisine === 'restaurant' ? 'מסעדה' : cuisine;
  };

  // Get a relevant food image based on cuisine type
  // Using curated Unsplash image IDs for reliable loading
  const getRestaurantImage = () => {
    const cuisine = getCuisineType().toLowerCase();
    
    // Curated food images from Unsplash (direct CDN links that work)
    const cuisineImages = {
      'italian': 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=250&fit=crop',
      'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
      'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=250&fit=crop',
      'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=250&fit=crop',
      'japanese': 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&h=250&fit=crop',
      'chinese': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=250&fit=crop',
      'thai': 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=250&fit=crop',
      'indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop',
      'mexican': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=250&fit=crop',
      'mediterranean': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop',
      'middle_eastern': 'https://images.unsplash.com/photo-1547424850-28ac9dc5b886?w=400&h=250&fit=crop',
      'kebab': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=250&fit=crop',
      'asian': 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=250&fit=crop',
      'seafood': 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=250&fit=crop',
      'steak': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=250&fit=crop',
      'vegetarian': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop',
      'vegan': 'https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=250&fit=crop',
      'cafe': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
      'bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop',
      'ice_cream': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=250&fit=crop',
    };

    // Default food images to pick from randomly
    const defaultImages = [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=250&fit=crop',
    ];

    // Return cuisine-specific image or random default
    if (cuisineImages[cuisine]) {
      return cuisineImages[cuisine];
    }
    
    // Use restaurant name to pick a consistent "random" image
    const nameHash = (props.name || '').split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return defaultImages[nameHash % defaultImages.length];
  };

  return (
    <div className="restaurant-card">
      {/* Restaurant Image */}
      <div className="card-image">
        <img 
          src={getRestaurantImage()} 
          alt={props.name || 'מסעדה'}
          loading="lazy"
        />
      </div>

      <div className="card-header">
        <span className="card-emoji">🍽️</span>
        <h2 className="restaurant-name">{props.name || 'מסעדה מסתורית'}</h2>
      </div>
      
      <div className="card-details">
        {getFullAddress() && (
          <div className="detail-row">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{getFullAddress()}</span>
          </div>
        )}
        
        <div className="detail-row">
          <span className="detail-icon">🍴</span>
          <span className="detail-text cuisine">{getCuisine()}</span>
        </div>
        
        {props.distance && (
          <div className="detail-row">
            <span className="detail-icon">🚶</span>
            <span className="detail-text">{formatDistance(props.distance)}</span>
          </div>
        )}

        {props.website && (
          <div className="detail-row">
            <span className="detail-icon">🌐</span>
            <a 
              href={props.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="detail-link"
            >
              לאתר המסעדה
            </a>
          </div>
        )}

        {/* Google Maps navigation link using coordinates */}
        {restaurant.geometry?.coordinates && (
          <div className="detail-row">
            <span className="detail-icon">🧭</span>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.coordinates[1]},${restaurant.geometry.coordinates[0]}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="detail-link navigate-link"
            >
              נווט עם Google Maps
            </a>
          </div>
        )}
      </div>

      <div className="card-footer">
        <p className="decision-text">🎉 הגורל בחר!</p>
        <p className="sub-text">בלי ויכוחים, רק אוכל טוב!</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
