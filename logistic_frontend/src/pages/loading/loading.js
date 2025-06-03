import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Loading.css';

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/public/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(location.state.payload),
        });

        const result = await response.json();

        if (response.ok) {
          navigate('/result', { state: result });
        } else {
          alert('Ошибка: ' + JSON.stringify(result.detail));
          navigate('/');
        }
      } catch (err) {
        alert('Ошибка подключения к серверу');
        navigate('/');
      }
    };

    fetchData();
  }, [location.state, navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
    }}>
      <div className="loader"></div>
      <p className='loading-page-text' style={{ marginTop: '20px'}}>
        Ищем лучшие предложения для Вас{'.'.repeat(dots)}
      </p>
    </div>
  );
}

export default LoadingPage;
