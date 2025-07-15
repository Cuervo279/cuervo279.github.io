import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../components/translations.js';
import PixelCanvasWrapper from "../components/PixelCanvasWrapper";


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
  }, []);


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

        {/* <section className='main-wrapper'>
          <section className='main-content flex'>
              <div className='pixel-element'>
                <PixelCanvasWrapper
                  gap={8}
                  speed={40}
                  colors=" #ff0000, #00ff00, #0000ff"
                  style={{ flex: 1 }}
                />
              </div>
              <div className='pixel-element'>
                <PixelCanvasWrapper
                  gap={5}
                  speed={25}
                  colors="#fef08a, #fde047, #eab308"
                  style={{ flex: 1 }}
                />
              </div>
              <div className='pixel-element'>
                <PixelCanvasWrapper
                  gap={6}
                  speed={80}
                  colors="#fecdd3, #fda4af, #e11d48"
                  style={{ flex: 1 }}
                />
              </div>
              <div className='pixel-element'>
                <PixelCanvasWrapper
                  gap={6}
                  speed={80}
                  colors="#fecdd3, #fda4af, #e11d48"
                  style={{ flex: 1 }}
                />
              </div>
          </section>
        </section> */}
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
          <div className='pixel-element'>

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



        <footer id='footer' className='footer-container flex bd-1 bd-radius-3'>
          <div className="footer-progress-bar" id="footerProgressBar" />
            <p><a>My</a><a className='' href="Profile.pdf" target="_blank">RESUME</a></p>
            <p><a className=''>COPYRIGHT © LEONARDO SILVA ALL RIGHTS RESERVED</a></p>
        </footer>

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
      <p>Lorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>


<p>Lorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

<p>Lorem Ipsum
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
      </main>
    </SweepTransition>
  );
};

export default DevPortfolio;