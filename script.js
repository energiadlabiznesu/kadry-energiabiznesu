const WEBHOOK_URL = 'https://hook.eu1.make.com/l08fd8lj04n2siouc7dccbhk2dmon5r6';

// Sticky nav shadow
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,0.1)' : '0 1px 8px rgba(0,0,0,0.06)';
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Form
const form = document.getElementById('contact-form');
const formWrap = document.getElementById('form-wrap');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Wysyłanie…';

  const data = new FormData(form);
  const params = new URLSearchParams();
  params.append('nazwa_placowki', data.get('nazwa_placowki') || '');
  params.append('imie_nazwisko', data.get('imie_nazwisko') || '');
  params.append('stanowisko', data.get('stanowisko') || '');
  params.append('email', data.get('email') || '');
  params.append('telefon', '+48' + (data.get('telefon') || '').replace(/\D/g, ''));
  params.append('wojewodztwo', data.get('wojewodztwo') || '');
  params.append('modul', data.get('modul') || '');
  params.append('liczba_osob', data.get('liczba_osob') || '');
  params.append('zrodlo', 'kadry2026');

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: params.toString()
    });
  } catch (_) {}

  formWrap.style.display = 'none';
  formSuccess.style.display = 'block';
});
