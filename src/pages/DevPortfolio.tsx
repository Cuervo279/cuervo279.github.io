import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../components/translations.ts';
// icons
import { GithubOutlined,
  BehanceOutlined,
  LinkedinFilled,
  DribbbleOutlined,
  MediumOutlined,
  MoonFilled,
  SunFilled,
} from '@ant-design/icons';
import {  } from 'lucide-react';
import { SiDevdotto } from "react-icons/si";
// styles
import SweepTransition from '../components/transitions/SweepTransition';
import '../styles/DevPorfolio.css';
// images


const DevPortfolio = () => {
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  const [isMoon, setIsMoon] = useState(true);
  const [rotating, setRotating] = useState(false);
  
  const [Localization, setLocalization] = useState<'us' | 'br'>('br');
  const [isPopped, setIsPopped] = useState(false);
  
  useEffect(() => {
    // Verifica o tema salvo no localStorage na inicialização
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsMoon(savedTheme === 'dark');
    }
  }, []);

  function changeFlag() {
    if (Localization === 'us') {
      setLocalization('br');
      setIsPopped(true);
      setTimeout(() => {
        setIsPopped(false);
      }, 200);
      
    } else {
      setLocalization('us');
      setIsPopped(true);
      setTimeout(() => {
        setIsPopped(false);
      }, 200);
    }
  }

  function toggleIcon() {
    setRotating(true);

    setTimeout(() => {
      const newIsMoon = !isMoon;
      setIsMoon(newIsMoon);

      // Atualiza o data-theme no HTML
      const newTheme = newIsMoon ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);

      // Salva a preferência no localStorage
      localStorage.setItem('theme', newTheme);

      setRotating(false);
    }, 500);
  }


  return (
    <SweepTransition
      active={transition}
      reverse={false}
      onComplete={() => {
        setTransition(false);
        navigate('/design');
      }}
    >
      <div className="dev-portfolio-content">
        
        <div className="navbar">
          <div className='navbar-logo-container'>
            <p>LEONARDO SILVA.</p>
            <div>
              <p>HOME</p>
              <p>{translations[Localization].about}</p>
              <p>{translations[Localization].contact}</p>
            </div>
          </div>

          <div className='navbar-social-icons-container font-size-3'>
            <GithubOutlined />
            <BehanceOutlined />
            <LinkedinFilled />
            <DribbbleOutlined />
            <MediumOutlined />
            <SiDevdotto />
            <div className={`navbar-theme-icon ${rotating ? 'rotating' : ''}`} onClick={toggleIcon} style={{ color: 'var(--portfolio-elements-textPrimary)' }}>
            {isMoon ? (<MoonFilled />) : (<SunFilled />)}
            </div>
            <div className={`${Localization === 'us' ? 'flag-eua' : 'flag-brasil'} ${isPopped ? 'pop' : ''}`}
              
              onClick={changeFlag}
              id="flag-icon" />
            </div>






        <h1 className="dev-portfolio-title">Portfólio Dev</h1>
        <button
          className="dev-portfolio-button"
          onClick={() => setTransition(true)}
          disabled={transition}
        >
          Ver Design →
        </button>

        <div className="gradient-container">
        <div className="gradient-border"></div>
          <div className="content">
            <h2>Conteúdo do Container</h2>
            <p>Este é um exemplo simples de um container com borda em gradiente.</p>
          </div>
  </div>
      </div>
      </div>
    </SweepTransition>
  );
};

export default DevPortfolio;