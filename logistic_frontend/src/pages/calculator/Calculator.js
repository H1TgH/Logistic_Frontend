import React, { useState } from 'react';
import './Calculator.css';
import { useNavigate } from 'react-router-dom';
import swapArrow from '../../assets/swap-arrow.svg';
import Header from '../../components/header/Header';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'


const token = 'ea8735bedf0b2f9eb7b423200c7c30cd6960b5cd';

function Calculator() {
  const navigate = useNavigate();

  const [fromCity, setFromCity] = useState(null); 
  const [toCity, setToCity] = useState(null);     
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [deliveryType, setDeliveryType] = useState(1);
  const [date, setDate] = useState('');

  const handleSubmit = () => {
  if (!fromCity?.data || !toCity?.data || !weight || !length || !width || !height) {
  alert('Пожалуйста, заполните все поля корректно.');
  return;
  }

  const payload = {
    service: 'cdek',
    from_location: {
      city_name: fromCity.data.city,
      fias_id: fromCity.data.city_fias_id
    },
    to_location: {
      city_name: toCity.data.city,
      fias_id: toCity.data.city_fias_id
    },
    packages: [
      {
        weight: parseInt(weight),
        length: parseInt(length),
        width: parseInt(width),
        height: parseInt(height)
      }
    ],
    delivery_type: parseInt(deliveryType),
    date: date || undefined,
    currency: 1,
    lang: 'rus'
  };

  navigate('/loading', { state: { payload } });
};


  return (
    <>
      <Header />
      <main className='bg-wo-image calculator-main-section'>
        <section className='calc-tips-section'>
          <div className='calc-tip'>
            <p className='tips-rectangle'>1</p>
            <p className='tip-text'>Укажите город отправки и получения посылки.</p>
          </div>
          <div className='calc-tip'>
            <p className='tips-rectangle'>2</p>
            <p className='tip-text'>
              Обязательно введите вес груза (кг) и габариты (см) вместе с упаковкой. <br />
              Обязательно для каждой новой позиции добавляйте новое место, иначе стоимость будет не точной.
            </p>
          </div>
          <div className='calc-tip'>
            <p className='tips-rectangle'>3</p>
            <p className='tip-text'>Выберите дату отгрузки и нажмите на кнопку “Рассчитать”.</p>
          </div>
        </section>

        <section className='calc-fields-section'>
          <div className='calc-title-underline'>
            <div className='title-container'>
              <h1>Рассчитать стоимость доставки</h1>
            </div>
          </div>

          <div className='calc-flex-container'>
            <div className='calc-flex-fields'>
              <div className='calc-direction-container'>
                <AddressSuggestions
                  token={token}
                  value={fromCity}
                  onChange={setFromCity}
                  placeholder="Откуда"
                  inputProps={{ className: 'direction-from' }}
                />

                <button
                  type='button'
                  className='calc-swap-button'
                  onClick={() => {
                    const temp = fromCity;
                    setFromCity(toCity);
                    setToCity(temp);
                  }}
                  aria-label='Поменять направления местами'
                >
                  <img src={swapArrow} alt='Поменять местами' className='swap-icon' />
                </button>

                <AddressSuggestions
                  token={token}
                  value={toCity}
                  onChange={setToCity}
                  placeholder="Куда"
                  inputProps={{ className: 'direction-to' }}
                />
              </div>

              <div className='calc-package-container'>
                <input
                  className='calc-weight-field'
                  placeholder='Вес (г)'
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <input
                  className='calc-length-field'
                  placeholder='Длина (см)'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <input
                  className='calc-width-field'
                  placeholder='Ширина (см)'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <input
                  className='calc-height-field'
                  placeholder='Высота (см)'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className='radio-square calc-deliverytype-container'>
                <label>
                  <input type='radio' checked={deliveryType === 1} onChange={() => setDeliveryType(1)} />
                  <span></span>
                  Склад - Склад
                </label>
                <label>
                  <input type='radio' checked={deliveryType === 2} onChange={() => setDeliveryType(2)} />
                  <span></span>
                  Склад - Дверь
                </label>
                <label>
                  <input type='radio' checked={deliveryType === 3} onChange={() => setDeliveryType(3)} />
                  <span></span>
                  Дверь - Склад
                </label>
                <label>
                  <input type='radio' checked={deliveryType === 4} onChange={() => setDeliveryType(4)} />
                  <span></span>
                  Дверь - Дверь
                </label>
              </div>

              <div className='calc-calendar-container'>
                <input type='date' value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <button className='calc-calculate' onClick={handleSubmit}>
                Рассчитать
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Calculator;
