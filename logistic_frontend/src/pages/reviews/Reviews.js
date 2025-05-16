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

  return (
    <>
      <Header />
      <main className='bg-wo-image reviews-main'>
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
        
      </main>
    </>
  );
};

export default Reviews;
