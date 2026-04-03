let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('cuai_lang', lang);

    // Update simple text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update Language Toggle Buttons highlighting
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang === lang) {
            btn.classList.add('text-brand-blue');
            btn.classList.replace('text-gray-300', 'text-white');
            btn.classList.remove('opacity-60');
        } else {
            btn.classList.remove('text-brand-blue', 'text-white');
            btn.classList.add('text-gray-300', 'opacity-60');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Language auto-detect / persistence
    const savedLang = localStorage.getItem('cuai_lang');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang && userLang.toLowerCase().includes('zh')) {
            setLanguage('zh');
        } else {
            setLanguage('en');
        }
    }

    // Language Toggle Listeners
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        const mobileLinks = menu.querySelectorAll('a:not(.lang-toggle-btn)');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('shadow-lg');
                nav.classList.replace('border-brand-slate/20', 'border-brand-slate/10');
            } else {
                nav.classList.remove('shadow-lg');
                nav.classList.replace('border-brand-slate/10', 'border-brand-slate/20');
            }
        });
    }
});
