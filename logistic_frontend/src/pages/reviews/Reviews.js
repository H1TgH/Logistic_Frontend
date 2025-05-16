import React, { useState } from 'react';
import Header from '../../components/header/Header';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || text.trim() === '') {
      alert('Пожалуйста, выберите рейтинг и напишите отзыв');
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      text,
    };

    setReviews([newReview, ...reviews]);
    setShowForm(false);
    setRating(0);
    setText('');
  };

  const getStats = () => {
    const total = reviews.length;
    if (total === 0) return { average: 0, distribution: {}, total: 0 };

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const average = (sum / total).toFixed(1);

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      distribution[r.rating]++;
    });

    return { average, distribution, total };
  };

  const { average, distribution, total } = getStats();

  return (
    <>
      <Header />
      <main className='bg-wo-image reviews-container'>
        <section className='reviews-section'>
          <h1>Отзывы</h1>

          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn-open-form">
              Оставить отзыв
            </button>
          )}

          {showForm && (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (hoveredStar || rating) ? 'filled' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Напишите ваш отзыв..."
                rows={4}
                required
              />

              <div>
                <button type="submit">Отправить</button>
                <button type="button" onClick={() => setShowForm(false)}>Отмена</button>
              </div>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length === 0 && <p className='empty-reviews-list'>Пока нет отзывов</p>}
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`star ${star <= review.rating ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                </div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="reviews-summary">
          <h3>Средняя оценка</h3>
          <div className="summary-average">
            <span className="average-score">{average}</span>
            <span className="star">★</span>
          </div>
          <p className='reviews-count-text'>на основании {total} отзывов</p>

          <div className="star-distribution">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="distribution-row">
                <span>{star} ★</span>
                <span>{distribution[star] || 0} отзывов</span>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </>
  );
};

export default Reviews;
