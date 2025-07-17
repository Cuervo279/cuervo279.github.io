import { useEffect, useState } from 'react';
import './Loading.css';
import Logo from './Logo.jsx';

const Loading = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onFinish) onFinish();
          return 100;
        }
        return prev + 1;
      });
    }, 20); // 0 a 100 em 2 segundos

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="loading-screen">
        <div className="logo-crow">
        <Logo color="#ffffff" width="150px" height="auto" />
        </div>
        <div className="loading-text">
            <p>Loading...</p>
            <p className="loading-percent">{progress}%</p>
        </div>
        <div className="loading-bar" style={{ height: `${progress}%` }} />
        <div className="loading-footer">
            Leonardo Cuervo @ 2025
        </div>
    </div>
  );
};

export default Loading;
