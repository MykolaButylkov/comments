const avatars = [
  // // Мужчины
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Jack',
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Ethan',

  // // Adventurer (мультяшные люди)
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Alex',
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Sophie',
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Ivan',
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Olga',

  // // Женщины
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Emma',
  // 'https://api.dicebear.com/8.x/adventurer/svg?seed=Luna',

  // // Роботы
  // 'https://api.dicebear.com/8.x/bottts/svg?seed=Robo1',
  // 'https://api.dicebear.com/8.x/bottts/svg?seed=BotX',

  // // Монстры
  // 'https://api.dicebear.com/8.x/micah/svg?seed=Monster1',
  // 'https://api.dicebear.com/8.x/micah/svg?seed=Zombo',


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
  const photo = document.getElementById('photo').files[0];

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

  if (photo) {
    const storageRef = storage.ref('review-photos/' + photo.name);
    storageRef.put(photo).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        reviewData.photoUrl = url;
        reviewRef.set(reviewData);
      });
    });
  } else {
    reviewRef.set(reviewData);
  }

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
        header.classList.add('review-header'); // классы для стилей

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

        // Фото (если есть) — показываем как галерею
        if (review.photoUrl) {
          const gallery = document.createElement('div');
          gallery.classList.add('review-gallery');

          const img = document.createElement('img');
          img.src = review.photoUrl;
          img.alt = "Фото с переезда";
          img.classList.add('review-photo');

          gallery.appendChild(img);
          reviewEl.appendChild(gallery);
        }

        // Добавляем карточку отзыва на страницу
        reviewsSection.appendChild(reviewEl);
      });
    }
  });
}


window.addEventListener('DOMContentLoaded', loadReviews);
