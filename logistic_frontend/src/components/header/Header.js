import React from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <div className='logo-nav'>
        <a className='logo' href='#'>
        <img src={logo} alt='Logo'/>
      </a>
      </div>
      <nav>
        <a className='home-link' href='#'>Главная</a>
        <a className='calculate-link' href='#'>Рассчитать стоимость</a>
        <a className='about-link' href='#'>О нас</a>
        <a className='reviews-link' href='#'>Отзывы</a>
        <a className='auth-link' href='#'>Вход/Регистрация</a>
      </nav>
    </header>
  );
};

export default Header;