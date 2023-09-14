// Описаний в документації
import SimpleLightbox from 'simplelightbox';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Імпорт списку галерей з файлу gallery-items.js
import { galleryItems } from './gallery-items';

console.log(galleryItems);

document.addEventListener('DOMContentLoaded', function () {
  // Отримуємо посилання на елемент галереї
  const galleryElement = document.querySelector('.gallery');

  // Створюємо масив посилань на зображення для галереї
  const imageLinks = galleryItems.map(item => {
    return `
      <li>
        <a href="${item.original}" class="gallery__item">
          <img src="${item.preview}" alt="${item.description}" class="gallery__image" />
        </a>
      </li>
    `;
  });

  // Додаємо зображення до галереї
  galleryElement.innerHTML = imageLinks.join('');

  // Створюємо об'єкт SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // Запускаємо галерею після додавання зображень
  lightbox.refresh();
});
