import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      setIsAuthenticated(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8000/api/v1/public/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке отзывов');
      }

      const data = await response.json();
      console.log('Данные с бэкенда:', data); // Логируем данные
      setReviews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || text.trim() === '') {
      alert('Пожалуйста, выберите рейтинг и напишите отзыв');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const newReview = {
        review: text,
        rate: rating,
        parent_id: null,
      };

      const response = await fetch('http://localhost:8000/api/v1/public/reviews', { // Исправлен URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при отправке отзыва');
      }

      await fetchReviews();
      setShowForm(false);
      setRating(0);
      setText('');
    } catch (err) {
      alert(err.message);
    }
  };

  const getStats = () => {
    const total = reviews.length;
    if (total === 0) return { average: 0, distribution: {}, total: 0 };

    const sum = reviews.reduce((acc, r) => acc + (Number(r.rate) || 0), 0);
    const average = (sum / total).toFixed(1);

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      const rate = Number(r.rate) || 0;
      if (rate >= 1 && rate <= 5) distribution[rate]++;
    });

    return { average, distribution, total };
  };

  const { average, distribution, total } = getStats();

  return (
    <>
      <Header />
      <main className="bg-wo-image reviews-container">
        <section className="reviews-section">
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
                <button type="button" onClick={() => setShowForm(false)}>
                  Отмена
                </button>
              </div>
            </form>
          )}

          <div className="reviews-list">
            {loading && <p>Загрузка отзывов...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && reviews.length === 0 && (
              <p className="empty-reviews-list">Пока нет отзывов</p>
            )}
            {!loading &&
              reviews.map((review) => {
                const rate = Number(review.rate) || 0;
                return (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-user">{review.username}</span>
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= rate ? 'filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="review-date">
                        {new Date(review.created_at).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="review-text">{review.review}</p>
                    {review.replies && review.replies.length > 0 && (
                      <div className="replies">
                        {review.replies.map((reply) => {
                          const replyRate = Number(reply.rate) || 0;
                          return (
                            <div key={reply.id} className="reply-item">
                              <div className="reply-header">
                                <span className="reply-user">{reply.username}</span>
                                <div className="stars">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      className={`star ${star <= replyRate ? 'filled' : ''}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="reply-date">
                                  {new Date(reply.created_at).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <p className="reply-text">{reply.review}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>

        <aside className="reviews-summary">
          <h3>Средняя оценка</h3>
          <div className="summary-average">
            <span className="average-score">{average}</span>
            <span className="star">★</span>
          </div>
          <p className="reviews-count-text">на основании {total} отзывов</p>

          <div className="star-distribution">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="distribution-row">
                <span>{star} <span className='aside-star'>★</span></span>
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