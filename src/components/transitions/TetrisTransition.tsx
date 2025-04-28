import { useEffect, useState, ReactNode, useRef } from 'react';
import './TetrisTransition.css';

interface TetrisTransitionProps {
  children: ReactNode;
  active: boolean;
  onComplete: () => void;
}

const TetrisTransition = ({ 
  children, 
  active, 
  onComplete 
}: TetrisTransitionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && !isAnimating) {
      console.log('Iniciando animação...');
      setIsAnimating(true);
      
      const handleAnimationEnd = () => {
        console.log('Animação concluída!');
        setIsAnimating(false);
        onComplete();
      };

      // Capturar todos os blocos
      const blocks = containerRef.current?.querySelectorAll('.tetris-block');
      
      // Observar o ÚLTIMO bloco
      const lastBlock = blocks?.[blocks.length - 1];
      lastBlock?.addEventListener('animationend', handleAnimationEnd);

      return () => {
        lastBlock?.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [active, isAnimating, onComplete]);

  return (
    <div className="tetris-container">
      {isAnimating && (
        <div className="tetris-transition" ref={containerRef}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="tetris-block"
              style={{
                '--i': i,
                '--delay': `${i * 0.1}s`,
                left: `${(i % 5) * 20}%`
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      
      <div className={`content ${isAnimating ? 'hidden' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default TetrisTransition;

