const SpinWheel = ({ isSpinning }) => {
  return (
    <div className={`spin-wheel ${isSpinning ? 'spinning' : ''}`}>
      <div className="wheel-inner">
        <span className="wheel-emoji">🍽️</span>
      </div>
      <div className="wheel-text">
        {isSpinning ? 'Finding your restaurant...' : 'Ready to spin!'}
      </div>
    </div>
  );
};

export default SpinWheel;
