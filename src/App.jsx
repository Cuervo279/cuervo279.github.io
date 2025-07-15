import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // use as rotas diretamente
import DevPortfolio from './pages/DevPortfolio';
import DesignPortfolio from './pages/DesignPortfolio';
import './styles/Main.css';
import SweepTransition from '../src/components/transitions/SweepTransition';

const App = () => {
  const [initialSweep, setInitialSweep] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInitialSweep(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SweepTransition active={initialSweep} onComplete={() => {}}>
      <Routes>
        <Route path="/" element={<Navigate to="/dev" replace />} />
        <Route path="/dev" element={<DevPortfolio />} />
        <Route path="/design" element={<DesignPortfolio />} />
      </Routes>
    </SweepTransition>
  );
};

export default App;
