import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoadingPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div style={{ padding: '50px', textAlign: 'center', fontSize: '24px' }}>
      <p>Загрузка данных...</p>
    </div>
  );
}

export default LoadingPage;
