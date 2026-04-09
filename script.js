const translations = {
  ru: {
    pageTitle: "3D Print Lab",
    tagline: "Студия прототипирования",
    brand: "3D Print Lab",
    kicker: "Выбор размера",
    heroTitle: "Выберите формат модели для 3D-печати",
    heroText: "Подберите удобный диапазон размеров, чтобы перейти к оплате заказа.",
    sizeSmall: "До 20 см",
    sizeSmallDesc: "Компактные фигурки и детали",
    sizeMedium: "До 50 см",
    sizeMediumDesc: "Макеты среднего размера",
    sizeLarge: "Более 50 см",
    sizeLargeDesc: "Крупные прототипы и арт-объекты",
    menuLabel: "Меню",
    settingsTitle: "Настройки",
    languageTitle: "Язык",
    profileTitle: "Профиль",
    profileNameLabel: "Имя",
    profilePhoneLabel: "Телефон",
    modalKicker: "Заказ",
    modalTitle: "Оплата",
    modalText: "Здесь будет форма оплаты",
    openMenuAria: "Открыть меню",
    closeMenuAria: "Закрыть меню",
    closeModalAria: "Закрыть окно"
  },
  en: {
    pageTitle: "3D Print Lab",
    tagline: "Prototype studio",
    brand: "3D Print Lab",
    kicker: "Size selection",
    heroTitle: "Choose the model size for 3D printing",
    heroText: "Pick the preferred size range to proceed to payment.",
    sizeSmall: "Up to 20 cm",
    sizeSmallDesc: "Compact figures and parts",
    sizeMedium: "Up to 50 cm",
    sizeMediumDesc: "Mid-size mockups",
    sizeLarge: "More than 50 cm",
    sizeLargeDesc: "Large prototypes and art pieces",
    menuLabel: "Menu",
    settingsTitle: "Settings",
    languageTitle: "Language",
    profileTitle: "Profile",
    profileNameLabel: "Name",
    profilePhoneLabel: "Phone",
    modalKicker: "Order",
    modalTitle: "Payment",
    modalText: "The payment form will appear here",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    closeModalAria: "Close modal"
  }
};

const body = document.body;
const html = document.documentElement;
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const langButtons = document.querySelectorAll("[data-lang]");
const modalTriggers = document.querySelectorAll("[data-open-modal]");
const translatableNodes = document.querySelectorAll("[data-i18n]");

let currentLanguage = "ru";

function setBodyLockState() {
  const shouldLock = sidebar.classList.contains("is-open") || !modalBackdrop.hidden;
  body.classList.toggle("is-locked", shouldLock);
}

function openSidebar() {
  sidebar.classList.add("is-open");
  sidebar.setAttribute("aria-hidden", "false");
  sidebarBackdrop.hidden = false;
  requestAnimationFrame(() => sidebarBackdrop.classList.add("is-visible"));
  menuToggle.setAttribute("aria-expanded", "true");
  setBodyLockState();
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebar.setAttribute("aria-hidden", "true");
  sidebarBackdrop.classList.remove("is-visible");
  menuToggle.setAttribute("aria-expanded", "false");
  window.setTimeout(() => {
    if (!sidebar.classList.contains("is-open")) {
      sidebarBackdrop.hidden = true;
    }
  }, 250);
  setBodyLockState();
}

function openModal() {
  modalBackdrop.hidden = false;
  setBodyLockState();
}

function closeModal() {
  modalBackdrop.hidden = true;
  setBodyLockState();
}

function applyTranslations(language) {
  const dictionary = translations[language];
  currentLanguage = language;

  translatableNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) {
      node.textContent = dictionary[key];
    }
  });

  document.title = dictionary.pageTitle;
  html.lang = language;
  menuToggle.setAttribute("aria-label", dictionary.openMenuAria);
  sidebarClose.setAttribute("aria-label", dictionary.closeMenuAria);
  modalClose.setAttribute("aria-label", dictionary.closeModalAria);

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.contains("is-open");
  if (isOpen) {
    closeSidebar();
    return;
  }
  openSidebar();
});

sidebarClose.addEventListener("click", closeSidebar);
sidebarBackdrop.addEventListener("click", closeSidebar);

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTranslations(button.dataset.lang);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modalBackdrop.hidden) {
      closeModal();
    }
    if (sidebar.classList.contains("is-open")) {
      closeSidebar();
    }
  }
});

applyTranslations(currentLanguage);
