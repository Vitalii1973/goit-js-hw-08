import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Отримуємо збережений стан з локального сховища
const savedState =
  JSON.parse(localStorage.getItem('feedback-form-state')) || {};

// Заповнюємо поля форми зі збереженого стану
if (savedState.email) {
  emailInput.value = savedState.email;
}

if (savedState.message) {
  messageTextarea.value = savedState.message;
}

// Функція для збереження стану форми в локальне сховище
const saveState = () => {
  const state = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(state));
};

// Відстежуємо подію input на полях форми та зберігаємо стан
emailInput.addEventListener(
  'input',
  throttle(() => {
    saveState();
  }, 500)
);

messageTextarea.addEventListener(
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

  // Виводимо дані форми в консоль
  console.log(formData);
});
