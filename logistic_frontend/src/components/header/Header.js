import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <div className='logo-nav'>
        <Link className='logo' to="/">
          <img src={logo} alt='Logo' />
        </Link>
      </div>
      <nav>
        <Link className='home-link' to="/">Главная</Link>
        <Link className='calculate-link' to="/calculate">Рассчитать стоимость</Link>
        <Link className='about-link' to="/about">О нас</Link>
        <Link className='reviews-link' to="/reviews">Отзывы</Link>
        <Link className='auth-link' to="/login">Вход/Регистрация</Link>
      </nav>
    </header>
  );
};

export default Header;
