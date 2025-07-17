// import { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';  // use as rotas diretamente
// import DevPortfolio from './pages/DevPortfolio';
// import DesignPortfolio from './pages/DesignPortfolio';
// import './styles/Main.css';
// import SweepTransition from '../src/components/transitions/SweepTransition';

// const App = () => {
//   const [initialSweep, setInitialSweep] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setInitialSweep(false);
//     }, 1500);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <SweepTransition active={initialSweep} onComplete={() => {}}>
//       <Routes>
//         <Route path="/" element={<Navigate to="/dev" replace />} />
//         <Route path="/dev" element={<DevPortfolio />} />
//         <Route path="/design" element={<DesignPortfolio />} />
//       </Routes>
//     </SweepTransition>
//   );
// };

// export default App;

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DevPortfolio from './pages/DevPortfolio';
import DesignPortfolio from './pages/DesignPortfolio';
import SweepTransition from '../src/components/transitions/SweepTransition';
import Loading from '../src/components/transitions/Loading';
import './styles/Main.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [sweep, setSweep] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);

  // Fase 1: Loading inicial
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setSweep(true); // Inicia sweep depois do loading
    }, 2000); // 2 segundos de loading

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Fase 2: Sweep em andamento
  const handleSweepComplete = () => {
    setSweep(false);
    setTransitionComplete(true);
  };

  // Fase 1
  if (loading) return <Loading />;

  // Fase 2
  if (sweep) {
    return (
      <SweepTransition active={true} onComplete={handleSweepComplete} />
    );
  }

  // Fase 3: Conteúdo principal
  if (transitionComplete) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/dev" replace />} />
        <Route path="/dev" element={<DevPortfolio />} />
        <Route path="/design" element={<DesignPortfolio />} />
      </Routes>
    );
  }

  return null; // Evita retornar nada durante transições indeterminadas
};

export default App;
