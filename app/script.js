// Seletor do ícone do sol
const themeToggle = document.getElementById('theme-toggle');
const topbar = document.getElementById('topbar');
const header = document.getElementById('header');
const resume = document.querySelector('.pop-left .a1');
const item = document.querySelectorAll('.item');

// Função para alternar entre os temas
function toggleTheme() {
  // Verifica se o tema atual é claro ou escuro
  const isDark = document.body.classList.contains('dark');

  // Alterna o tema
  if (isDark) {
    document.body.classList.remove('dark');
    themeToggle.classList.remove('dark');
    header.classList.remove('dark');
    resume.classList.remove('dark');
    item.forEach((itemElement) => {
        itemElement.classList.remove('dark');
        itemElement.style.backgroundColor = '#aaa';
      });
    themeToggle.classList.remove('cp-moon');
    themeToggle.classList.add('cp-sun');
    topbar.classList.remove('topbar');
    topbar.classList.add('topbarLG');
  } else {
    document.body.classList.add('dark');
    themeToggle.classList.add('dark');
    header.classList.add('dark');
    resume.classList.add('dark');
    item.forEach((itemElement) => {
        itemElement.classList.add('dark');
        itemElement.style.removeProperty('background-color')
      });
    themeToggle.classList.remove('cp-sun');
    themeToggle.classList.add('cp-moon');
    topbar.classList.remove('topbarLG');
    topbar.classList.add('topbar');
  }
}

// Adiciona evento de clique ao ícone do sol
themeToggle.addEventListener('click', toggleTheme);






// Seleciona o ícone de bandeira e a seção principal
const iconeBandeira = document.getElementById('icon-flag');
const main = document.getElementById('main');

// Variável para controlar o estado atual da bandeira e do conteúdo
let estadoAtual = 'us';

// Função para mudar a bandeira e o conteúdo
function mudarBandeira() {
  if (estadoAtual === 'br') {
    // Muda o conteúdo para inglês e a bandeira para o Brasil
    main.innerHTML = `
      <h1>Content in English</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
    `;
    iconeBandeira.innerHTML = '<img src="img/icon/br.svg" alt="Bandeira do Brasil">';
    iconeBandeira.classList.add('pop');
    setTimeout(() => {
        iconeBandeira.classList.remove('pop');
      }, 100);
    
    // Atualiza o estado atual
    estadoAtual = 'us';
  } else {
    // Muda o conteúdo para português e a bandeira para os EUA
    main.innerHTML = `
      <h1>Conteúdo em português</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
    `;
    iconeBandeira.innerHTML = '<img src="img/icon/us.svg" alt="Bandeira dos EUA">';
    iconeBandeira.classList.add('pop');
    setTimeout(() => {
        iconeBandeira.classList.remove('pop');
      }, 100);
    
    // Atualiza o estado atual
    estadoAtual = 'br';
  }
}

// Adiciona o evento de clique ao ícone de bandeira
iconeBandeira.addEventListener('click', mudarBandeira);



// Dropdown Menu
const hamburgerIcon = document.getElementById('hamburger-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');

hamburgerIcon.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// fecha o menu quando clicar fora dele
document.addEventListener('click', (e) => {
  if (!e.target.closest('.social-icons')) {
    dropdownMenu.classList.remove('show');
  }
});