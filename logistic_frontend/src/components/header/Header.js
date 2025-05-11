import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <a className='logo' href='#'>
        <img src='#' alt='Logo' />
      </a>
      <a className='home-link' href='#'>Главная</a>
      <a className='calculate-link' href='#'>Рассчитать стоимость</a>
      <a className='about-link' href='#'>О нас</a>
      <a className='reviews-link' href='#'>Отзывы</a>
      <a className='auth-link' href='#'>Вход/Регистрация</a>
    </header>
  );
};

export default Header;