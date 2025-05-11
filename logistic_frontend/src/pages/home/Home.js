import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
      <header>
        <a className="logo" href="#">
          <img src="#"/>
        </a>
        <a className='home-link' href="#">Главная</a>
        <a className='calculate-link' href="#">Рассчитать стоимость</a>
        <a className='about-link' href="#">О нас</a>
        <a className='reviews-link' href="#">Отзывы</a>
        <a className='auth-link' href="#">Вход/Регистрация</a>
      </header>
      <main>
        <h1>Logistic</h1>
        <p>
          Онлайн-сервис расчета доставки крупногабаритных грузов по РФ<br />
          Быстрое сравнение цен от десятков транспортных компаний. Без звонков. Без сюрпризов.
        </p>
      </main>
    </>
  );
};

export default Home;
