const SpinWheel = ({ isSpinning }) => {
  return (
    <div className={`spin-wheel ${isSpinning ? 'spinning' : ''}`}>
      <div className="wheel-inner">
        <span className="wheel-emoji">🍽️</span>
      </div>
      <div className="wheel-text">
        {isSpinning ? 'מחפש את המסעדה המושלמת...' : 'מוכן לסיבוב!'}
      </div>
    </div>
  );
};

export default SpinWheel;
