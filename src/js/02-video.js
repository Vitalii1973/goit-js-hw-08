import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Отримуємо посилання на плеєр
const vimeoPlayer = new Player('vimeo-player');

// Отримуємо посилання на HTML елемент плеєра
const iframe = document.querySelector('#vimeo-player');

// Функція для збереження часу відтворення у локальне сховище
function saveCurrentTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}

// Функція для завантаження часу відтворення з локального сховища
function loadCurrentTime() {
  return parseFloat(localStorage.getItem('videoplayer-current-time')) || 0;
}

// Відстежуємо подію timeupdate для оновлення часу відтворення
vimeoPlayer.on(
  'timeupdate',
  throttle(({ seconds }) => {
    saveCurrentTime(seconds);
  }, 1000)
); // Оновлюємо не частіше, ніж раз на секунду

// Отримуємо збережений час відтворення та встановлюємо його
const savedTime = loadCurrentTime();
vimeoPlayer
  .setCurrentTime(savedTime)
  .then(() => {
    // Після встановлення часу відтворення, запускаємо відтворення
    vimeoPlayer.play();
  })
  .catch(error => {
    console.error('Unable to set the current time:', error);
  });
