import { ReactNode, useEffect, useState } from 'react';
import './SweepTransition.css';

interface SweepTransitionProps {
  active: boolean;
  onComplete: () => void;
  children: ReactNode;
  reverse?: boolean; // <- Nova prop
}

const SweepTransition = ({ active, onComplete, children, reverse = false }: SweepTransitionProps) => {
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (active) {
      setShowTransition(true);

      const timeout = setTimeout(() => {
        onComplete();
        setShowTransition(false);
      }, 1500); // duração total

      return () => clearTimeout(timeout);
    }
  }, [active, onComplete]);

  return (
    <div className="sweep-transition-wrapper">
      {children}
      {showTransition && (
        <div className={`page-transition ${reverse ? 'reverse' : ''}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="page-transition_block" />
          ))}
        </div>
      )}
    </div>
  );
};

export default SweepTransition;
