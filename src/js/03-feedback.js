import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Отримуємо збережений стан з локального сховища
const savedState =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Функція для заповнення полів форми зі збереженого стану
function fillForm(savedState) {
  emailInput.value = savedState.email || '';
  messageTextarea.value = savedState.message || '';
}

// Заповнюємо поля форми зі збереженого стану
fillForm(savedState);

// Функція для збереження стану форми в локальне сховище
function saveState() {
  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(state));
}

// Відстежуємо подію input на формі та зберігаємо стан
form.addEventListener(
  'input',
  throttle(() => {
    saveState();
  }, 500)
);

// Обробник події submit форми
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Очищаємо локальне сховище
  localStorage.removeItem('feedback-form-state');

  // Очищаємо поля форми
  emailInput.value = '';
  messageTextarea.value = '';

  // Виводимо дані форми в консоль
  console.log(formData);
});
