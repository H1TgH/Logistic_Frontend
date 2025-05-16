import React from 'react';
import './Login.css';

const LoginForm = () => {
  return (
    <div className='background'>
      <div className="login-form">
        <div className="underline-wrapper">
          <h2>Вход</h2>
        </div>
        <form>
          <div className="form-group email">
            <p>Почта/Логин</p>
            <input type="text" required />
          </div>
          <div className="form-group password">
            <p>Пароль</p>
            <input type="password" required />
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
