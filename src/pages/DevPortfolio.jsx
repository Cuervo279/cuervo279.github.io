import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import translations from '../components/translations.js';
import PixelCanvasWrapper from '../components/PixelCanvasWrapper';
import CircularGallery from '../components/effects/CircularGallery'



// icons
import { GithubOutlined,
  BehanceOutlined,
  LinkedinFilled,
  DribbbleOutlined,
  MediumOutlined,
  MoonFilled,
  SunFilled,
} from '@ant-design/icons';
import { 
  CodeXml, 
  Frame,
  LayoutGrid,
  Gamepad,
} from 'lucide-react';
import { SiDevdotto } from "react-icons/si";

// styles
import SweepTransition from '../components/transitions/SweepTransition';
import '../styles/DevPortfolio.css';
import TextPressure from '../components/effects/TextPressure';

// images


const DevPortfolio = () => {
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

  const [isMoon, setIsMoon] = useState(true);
  const [rotating, setRotating] = useState(false);
  
  const [Localization, setLocalization] = useState('br');

  const getLocale = () => {
    return Localization === 'br' ? 'en' : 'pt-BR';
  };
  const [isPopped, setIsPopped] = useState(false);
  
  useEffect(() => {
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsMoon(savedTheme === 'dark');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsMoon(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  //ROLAGEM

  const experienceRef = useRef(null);
  const skillRef = useRef(null);
  const projectRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
  
      const progressBar = document.getElementById('footerProgressBar');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };
  
    window.addEventListener('scroll', updateProgressBar);
    return () => window.removeEventListener('scroll', updateProgressBar);
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
      <main className="dev-portfolio-content wd-10 comfortaa-light">
        <header className="dev-portfolio-header flex">

          <div className='navbar-logo-container flex-col'>
            <a
              className="logo font-size-6"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              LEONARDO <span className={`last-name ${hovered ? 'fade-out' : 'fade-in'}`}>{hovered ? 'CUERVO.' : 'SILVA.'}</span>
            </a>
            <div className='flex'>
              <a href="/dev">HOME</a>
              <a href="">{translations[Localization].about}</a>
              <a href="">{translations[Localization].contact}</a>
            </div>
          </div>

          <div className='navbar-social-icons-container font-size-3'>
            <a href=''><GithubOutlined /></a>
            <a href=''><BehanceOutlined /></a>
            <a href=''><LinkedinFilled /></a>
            <a href=''><DribbbleOutlined /></a>
            <a href=''><MediumOutlined /></a>
            <a href=''><SiDevdotto /></a>
            <div className={`navbar-theme-icon ${rotating ? 'rotating' : ''}`} onClick={toggleIcon} style={{ color: 'var(--portfolio-elements-textPrimary)' }}>
            {isMoon ? (<MoonFilled />) : (<SunFilled />)}
            </div>
            <div className={`${Localization === 'us' ? 'flag-eua' : 'flag-brasil'} ${isPopped ? 'pop' : ''}`}
              
              onClick={changeFlag}
              id="flag-icon" />
          </div>

        </header> 

        <div className='todays-date bd-1 bd-radius-3 wd-15 pdr-2 pdl-2'>
          <p>{new Date().toLocaleDateString(getLocale(), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
                
      <section className='main-wrapper'>
        <section className='main-content'>
          <div className='pixel-element'>

            <p style={{ filter: `
            drop-shadow(0px 0px 5px #0000ff)
            drop-shadow(0px 0px 8px #0000ffaa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #0000ff88)`,
            }} >DEVELOPER</p>
            <CodeXml className='icon-dev' size={48}
            style={{ filter: `
            drop-shadow(0px 0px 5px #0000ff)
            drop-shadow(0px 0px 8px #0000ffaa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #0000ff88)`,
            }} />

            
            <PixelCanvasWrapper
              gap={8}
              speed={40}
              colors=" #2c3e50, #00f7ff, #0000ff"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='pixel-element' 
          onClick={() => setTransition(true)}
          disabled={transition}>

          <p style={{ filter: `
            drop-shadow(0px 0px 5px #ff9f1c)
            drop-shadow(0px 0px 8px #ff9f1caa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #ff9f1c88)`,
            }}>DESIGNER</p>
            <Frame className='icon-dev' size={48}
            style={{ filter: `
            drop-shadow(0px 0px 5px #ff9f1c)
            drop-shadow(0px 0px 8px #ff9f1caa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #ff9f1c88)`,
            }} />
            <PixelCanvasWrapper
              gap={8}
              speed={50}
              colors=" #ff9f1c, #900C3F, #FFC300"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='pixel-element'>

            <p style={{ filter: `
            drop-shadow(0px 0px 5px #27ae60)
            drop-shadow(0px 0px 8px #27ae60aa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #27ae6088)`,
            }}>SOFTWARE ENGINEER</p>
            <LayoutGrid className='icon-dev' size={48}
            style={{ filter: `
            drop-shadow(0px 0px 5px #27ae60)
            drop-shadow(0px 0px 8px #27ae60aa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #27ae6088)`,
            }} />
            <PixelCanvasWrapper
              gap={8}
              speed={60}
              colors=" #27ae60, #00ff2e, #a6ff00"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div className='pixel-element'>

            <p style={{ filter: `
            drop-shadow(0px 0px 5px #8e44ad)
            drop-shadow(0px 0px 8px #8e44adaa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #8e44ad88)`,}}>GAMER DEV</p>
            <Gamepad className='icon-dev' size={48} 
            style={{ filter: `
            drop-shadow(0px 0px 5px #8e44ad)
            drop-shadow(0px 0px 8px #8e44adaa) /* 'aa' adiciona um pouco de transparência */
            drop-shadow(0px 0px 12px #8e44ad88)`,
            }} />
            <PixelCanvasWrapper
              gap={8}
              speed={80}
              colors=" #8e44ad, #4200ff, #3b0090"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </section>
        </section>

        <div className='welcome-container'>
          <TextPressure
            text={translations[Localization].welcome}
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            minFontSize={36}
          />
        </div>

        <footer id='footer' className='footer-container flex bd-1 bd-radius-3'>
          <div className="footer-progress-bar" id="footerProgressBar" />
            <p>My <a className='' href="Profile.pdf" target="_blank">RESUME</a></p>
            <p>
              <a href="#experience" onClick={(e) => {e.preventDefault();  scrollTo(experienceRef);}}>
                {translations[Localization].experience}</a>
                </p>
            <p>
              <a href="#experience" onClick={(e) => {e.preventDefault();  scrollTo(skillRef);}}>
            {translations[Localization].skill}</a>
            </p>
            <p>
              <a href="#experience" onClick={(e) => {e.preventDefault();  scrollTo(projectRef);}}>
            {translations[Localization].project}</a>
            </p>
            <p>COPYRIGHT © LEONARDO SILVA ALL RIGHTS RESERVED</p>
        </footer>

        <section className='portfolio-container'>

          <section ref={experienceRef} id="experience">
            <div className="glitch" data-text={translations[Localization].experience}>{translations[Localization].experience}</div> 



            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
            </div>

   
          </section>

          <section ref={skillRef} id="skill">
            <h2 className='experience-title'>{translations[Localization].experience}</h2>
            <p className='experience-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul className='experience-list'>
              <li className='experience-item'>
                <h3 className='experience-item-title'>Software Engineer at XYZ Company</h3>
              </li>
            </ul>
          </section>
          
          <section ref={projectRef} id="project">

          <h2 className='experience-title'>{translations[Localization].experience}</h2>
          <p className='experience-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <ul className='experience-list'>
            <li className='experience-item'>
              <h3 className='experience-item-title'>Software Engineer at XYZ Company</h3>
            </li>
          </ul>
          </section>

        </section>

        
      </main>
    </SweepTransition>
  );
};

export default DevPortfolio;