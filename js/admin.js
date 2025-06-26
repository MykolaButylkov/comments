const ADMIN_PASSWORD = 'kolyapereezd1999';
const isAdmin = localStorage.getItem('isAdmin') === 'true';

if (!isAdmin) {
  const loginBox = document.createElement('div');
  loginBox.innerHTML = `
    <div style="max-width: 300px; margin: 40px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h3>Вход администратора</h3>
      <input type="password" id="admin-password" placeholder="Введите пароль" style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #ccc;" />
      <button id="admin-login" style="padding: 10px 20px; background: #36a9e1; color: #fff; border: none; border-radius: 6px; cursor: pointer;">Войти</button>
    </div>
  `;
  document.body.innerHTML = '';
  document.body.appendChild(loginBox);

  document.getElementById('admin-login').addEventListener('click', () => {
    const input = document.getElementById('admin-password').value;
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      location.reload();
    } else {
      alert('Неверный пароль');
    }
  });

} else {
  const adminSection = document.getElementById('admin-reviews');

  db.ref('reviews').once('value', snapshot => {
    const reviews = snapshot.val();
    if (!reviews) {
      adminSection.innerHTML = '<p>Отзывов пока нет.</p>';
      return;
    }

    Object.entries(reviews).forEach(([id, review]) => {
      const reviewEl = document.createElement('div');
      reviewEl.classList.add('review');
      reviewEl.dataset.reviewId = id;

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

      const rating = document.createElement('p');
      rating.textContent = 'Рейтинг: ' + '⭐'.repeat(review.rating);
      rating.classList.add('review-rating');
      reviewEl.appendChild(rating);

      const message = document.createElement('p');
      message.textContent = review.message;
      reviewEl.appendChild(message);

      // Фото
      if (review.photoUrl) {
        const img = document.createElement('img');
        img.src = review.photoUrl;
        img.alt = "Фото с переезда";
        img.classList.add('review-photo');
        reviewEl.appendChild(img);
      }

      // Кнопка удаления
      const del = document.createElement('button');
      del.textContent = '🗑 Удалить';
      del.classList.add('delete-btn');
      Object.assign(del.style, {
        marginTop: '10px',
        background: '#e53935',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '6px',
        cursor: 'pointer'
      });

      del.addEventListener('click', () => {
        if (confirm('Удалить этот отзыв?')) {
          db.ref('reviews').child(id).remove();
          reviewEl.remove();
        }
      });

      reviewEl.appendChild(del);
      adminSection.appendChild(reviewEl);
    });
  });
}
