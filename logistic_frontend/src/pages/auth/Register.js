import React from 'react';
import './Register.css';

const RegisterForm = () => {
  return (
    <div className='background'>
    <div className="register-form">
    <div class="underline-wrapper">
        <h2>Регистрация</h2>
    </div>
      <form>
        <div className="form-group email">
            <p>Почта</p>
          <input type="email" required />
        </div>
        <div className="form-group login">
            <p>Логин</p>
          <input type="text" required />
        </div>
        <div className="form-group phone">
            <p>Номер телефона</p>
          <input type="tel" required />
        </div>
        <div className="form-group password">
            <p>Пароль</p>
          <input type="password" required />
        </div>
        <div className="form-group password-confirm">
            <p>Подтвердите пароль</p>
          <input type="password" required />
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