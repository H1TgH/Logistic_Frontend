import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert('Ошибка входа: ' + err.message);
    }
  };

  return (
    <div className="background">
      <div className="login-form">
        <div className="underline-wrapper">
          <h2>Вход</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group email">
            <p>Почта/Логин</p>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="form-group password">
            <p>Пароль</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;