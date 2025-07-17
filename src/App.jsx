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
  const [initialSweep, setInitialSweep] = useState(true);
  const [loading, setLoading] = useState(false);

  // Quando o sweep termina, ativa o loading
  const handleSweepComplete = () => {
    setInitialSweep(false);
    setLoading(true);

    // Simula o carregamento, pode ser o fetch de dados ou delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  
  // Enquanto estiver no sweep, mostra o SweepTransition
  if (initialSweep) {
    return (
      
      <SweepTransition active={true} onComplete={handleSweepComplete}>
        {/* Pode deixar vazio, ou um conteúdo de loading mínimo */}
      </SweepTransition>
    );
  }

  // Se estiver carregando após o sweep, mostra o loading cyberpunk
  if (loading) {
    return <Loading />;
  }

  // Depois de tudo, mostra as rotas
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dev" replace />} />
      <Route path="/dev" element={<DevPortfolio />} />
      <Route path="/design" element={<DesignPortfolio />} />
    </Routes>
  );
};

export default App;
