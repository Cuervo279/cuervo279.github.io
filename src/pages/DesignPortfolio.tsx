import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweepTransition from '../components/transitions/SweepTransition';

const DesignPortfolio = () => {
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  return (
    <SweepTransition
      active={transition}
      reverse={true}
      onComplete={() => {
        setTransition(false);
        navigate('/dev');
      }}
    >
      <div className="design-portfolio-content">
        <h1 className="design-portfolio-title">Portfólio Design</h1>
        <button
          className="design-portfolio-button"
          onClick={() => setTransition(true)}
          disabled={transition}
        >
          Ver Dev ←
        </button>
      </div>
    </SweepTransition>
  );
};

export default DesignPortfolio;