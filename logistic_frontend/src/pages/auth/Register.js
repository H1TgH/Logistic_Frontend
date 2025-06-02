import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('Пароли не совпадают');
      return;
    }

    const data = {
      email,
      username,
      phone,
      password,
      password_confirm: passwordConfirm,
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/public/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Ошибка регистрации: ' + JSON.stringify(errorData));
        return;
      }

      navigate('/');

    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка регистрации: ' + error.message);
    }
  };

  return (
    <div className='background'>
      <div className="register-form">
        <div className="underline-wrapper">
          <h2>Регистрация</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group email">
            <p>Почта</p>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group login">
            <p>Логин</p>
            <input 
              type="text" 
              required 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group phone">
            <p>Номер телефона</p>
            <input 
              type="tel" 
              required 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
            />
          </div>
          <div className="form-group password">
            <p>Пароль</p>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <div className="form-group password-confirm">
            <p>Подтвердите пароль</p>
            <input 
              type="password" 
              required 
              value={passwordConfirm} 
              onChange={e => setPasswordConfirm(e.target.value)} 
            />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="agreement" required />
            <label htmlFor="agreement">
              Я согласен на обработку персональных данных
            </label>
          </div>
          <button className='register-button' type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
