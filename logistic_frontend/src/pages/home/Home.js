import React from 'react';
import './Home.css';
import Header from '../../components/header/Header';

const Home = () => {
  return (
    <>
      <Header /> {}
      <main className='bg-image home-page-bg'>
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