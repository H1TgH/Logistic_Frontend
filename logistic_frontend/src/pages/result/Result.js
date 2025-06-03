import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import './Result.css';
import swapArrow from '../../assets/swap-arrow.svg';


function Result() {
  const location = useLocation();
  const data = location.state?.request || {};

  const formatDate = (dateStr, offsetDays) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + offsetDays);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <>
      <Header />
      <main className="bg-wo-image result-main-section">
        <section className="input-summary">
          <div className='calc-direction-container'>
            <input
              className='direcrion-from'
              value={data.from_location?.city_name || ''}
            />

            <button
              type='button'
              className='result-arrow'
            >
              <img src={swapArrow} alt='Поменять местами' className='swap-icon' />
            </button>

            <input
              className='direcrion-to'
              value={data.to_location?.city_name || ''}
            />
          </div>
          <div>
            <strong>Тип доставки:</strong>{' '}
            {data?.request?.delivery_type?.join(', ')}
          </div>
          <div>
            <strong>Габариты:</strong>{' '}
            {data?.request?.packages?.[0]?.weight} кг,{' '}
            {data?.request?.packages?.[0]?.length}x
            {data?.request?.packages?.[0]?.width}x
            {data?.request?.packages?.[0]?.height} см
          </div>
          <div>
            <strong>Дата отгрузки:</strong>{' '}
            {new Date(data?.request?.shipment_date).toLocaleDateString('ru-RU')}
          </div>
        </section>

        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Стоимость</th>
                <th>Срок доставки</th>
                <th>Сервис</th>
              </tr>
            </thead>
            <tbody>
              {data?.results?.map((item, index) => (
                <tr key={index}>
                  <td>{item.price} ₽</td>
                  <td>
                    {item.delivery_days} дн. (
                    {formatDate(data?.request?.shipment_date, item.delivery_days)})
                  </td>
                  <td className="service-column">{item.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default Result;
