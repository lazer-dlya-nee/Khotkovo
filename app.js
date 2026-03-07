const tg = window.Telegram?.WebApp;
const DIKIDI_URL = 'https://dikidi.net/ru/profile/lazer_dlya_neyo_1432304';
const TELEGRAM_CHANNEL = 'https://t.me/Lazer_studio_khotkovo';

function openExternal(url) {
  if (tg?.openLink) {
    tg.openLink(url, { try_instant_view: false });
  } else {
    window.open(url, '_blank', 'noopener');
  }
}

function openTelegram(url) {
  if (tg?.openTelegramLink) {
    tg.openTelegramLink(url);
  } else {
    window.open(url, '_blank', 'noopener');
  }
}

if (tg) {
  tg.ready();
  tg.expand();
  tg.enableClosingConfirmation();

  const bg = tg.themeParams.bg_color || '#f7edf0';
  const header = tg.themeParams.secondary_bg_color || '#f6e9ee';
  tg.setBackgroundColor(bg);
  tg.setHeaderColor(header);

  const mainButton = tg.MainButton;
  mainButton.setText('Записаться в Dikidi');
  mainButton.show();
  mainButton.onClick(() => openExternal(DIKIDI_URL));

  const backButton = tg.BackButton;
  backButton.hide();
}

document.querySelectorAll('.js-dikidi').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openExternal(DIKIDI_URL);
  });
});

document.querySelectorAll('.js-telegram-link').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openTelegram(TELEGRAM_CHANNEL);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.bottom-nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
sections.forEach((section) => observer.observe(section));


function bookMaster(master) {
  const masterLinks = {
    marina: 'https://dikidi.net/ru/profile/lazer_dlya_neyo_1432304/master/3092640',
    anna: 'https://dikidi.net/ru/profile/lazer_dlya_neyo_1432304/master/4033672'
  };

  const url = masterLinks[master] || DIKIDI_URL;
  openExternal(url);
}
