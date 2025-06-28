const avatars = [
  // Micah (современный мульт стиль)
  'https://api.dicebear.com/8.x/micah/svg?seed=user1',
  'https://api.dicebear.com/8.x/micah/svg?seed=user2',
  'https://api.dicebear.com/8.x/micah/svg?seed=user3',
  'https://api.dicebear.com/8.x/micah/svg?seed=user4',
  'https://api.dicebear.com/8.x/micah/svg?seed=user5',
  'https://api.dicebear.com/8.x/micah/svg?seed=user6',
  'https://api.dicebear.com/8.x/micah/svg?seed=user7',
  'https://api.dicebear.com/8.x/micah/svg?seed=user8',
  'https://api.dicebear.com/8.x/micah/svg?seed=user9',
  'https://api.dicebear.com/8.x/micah/svg?seed=user10',
  'https://api.dicebear.com/8.x/micah/svg?seed=user11',
  'https://api.dicebear.com/8.x/micah/svg?seed=user12',
  'https://api.dicebear.com/8.x/micah/svg?seed=user13',
  'https://api.dicebear.com/8.x/micah/svg?seed=user14',
];

function submitReview() {
  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const rating = document.getElementById('rating').value;

  if (!name || !message) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  const reviewRef = db.ref('reviews').push();
  const reviewData = {
    name,
    message,
    rating,
    avatarUrl: avatar,
    timestamp: new Date().toISOString()
  };

  reviewRef.set(reviewData);
  alert('Спасибо за отзыв!');
}

function loadReviews() {
  const reviewsSection = document.getElementById('reviews-section');

  db.ref('reviews').on('value', snapshot => {
    reviewsSection.innerHTML = ''; // Очистка перед добавлением новых отзывов
    const reviews = snapshot.val();
    if (reviews) {
      Object.entries(reviews).forEach(([id, review]) => {
        const reviewEl = document.createElement('div');
        reviewEl.classList.add('review');
        reviewEl.dataset.reviewId = id;

        // Заголовок: аватар + имя
        const header = document.createElement('div');
        header.classList.add('review-header');

        const avatar = document.createElement('img');
        avatar.src = review.avatarUrl || 'https://placekitten.com/80/80';
        avatar.alt = "Аватар";
        avatar.classList.add('review-avatar');

        const name = document.createElement('h3');
        name.textContent = review.name;
        name.style.margin = '0';

        header.appendChild(avatar);
        header.appendChild(name);
        reviewEl.appendChild(header);

        // Рейтинг
        const rating = document.createElement('p');
        rating.textContent = 'Рейтинг: ' + '⭐'.repeat(review.rating);
        rating.classList.add('review-rating');
        reviewEl.appendChild(rating);

        // Сообщение
        const message = document.createElement('p');
        message.textContent = review.message;
        reviewEl.appendChild(message);

        // Кнопка удаления — только для админа
        if (localStorage.getItem('isAdmin') === 'true') {
          const del = document.createElement('button');
          del.textContent = '🗑 Удалить';
          del.classList.add('delete-btn');
          del.style.marginTop = '10px';
          del.style.background = '#e53935';
          del.style.color = '#fff';
          del.style.border = 'none';
          del.style.padding = '8px 12px';
          del.style.borderRadius = '6px';
          del.style.cursor = 'pointer';
          del.onclick = () => {
            if (confirm('Удалить этот отзыв?')) {
              db.ref('reviews/' + id).remove();
              reviewEl.remove();
            }
          };
          reviewEl.appendChild(del);
        }

        reviewsSection.appendChild(reviewEl);
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', loadReviews);
