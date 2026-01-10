const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

  const props = restaurant.properties;
  
  const formatDistance = (meters) => {
    if (!meters) return null;
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };

  const getCuisine = () => {
    if (props.categories) {
      // Find specific cuisine category
      const cuisineCategory = props.categories.find(cat => 
        cat.includes('cuisine') || cat.includes('catering')
      );
      if (cuisineCategory) {
        // Clean up the category name
        return cuisineCategory.split('.').pop().replace(/_/g, ' ');
      }
    }
    return 'Restaurant';
  };

  return (
    <div className="restaurant-card">
      <div className="card-header">
        <span className="card-emoji">🍽️</span>
        <h2 className="restaurant-name">{props.name || 'Mystery Restaurant'}</h2>
      </div>
      
      <div className="card-details">
        {props.address_line2 && (
          <div className="detail-row">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{props.address_line2}</span>
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
              Visit Website
            </a>
          </div>
        )}
      </div>

      <div className="card-footer">
        <p className="decision-text">🎉 Your decision has been made!</p>
        <p className="sub-text">No more arguments, just great food!</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
