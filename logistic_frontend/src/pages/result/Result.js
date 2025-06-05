import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import './Result.css';
import rightArrow from '../../assets/right-arrow.svg';

function Result() {
  const location = useLocation();
  const data = location.state?.request || {};

  const formatDate = (dateStr, offsetDays) => {
    if (!dateStr || !offsetDays) return 'Не указано';
    let formattedDateStr = dateStr;
    if (dateStr.includes('.')) {
      const [day, month, year] = dateStr.split('.');
      formattedDateStr = `${year}-${month}-${day}`;
    }
    const date = new Date(formattedDateStr);
    if (isNaN(date.getTime())) return 'Не указано';
    date.setDate(date.getDate() + offsetDays);
    return date.toLocaleDateString('ru-RU');
  };

  const shipmentDate = data.shipment_date
    ? new Date(data.shipment_date).toLocaleDateString('ru-RU')
    : 'Не указано';

  return (
    <>
      <Header />
      <main className="bg-wo-image result-main-section">
        <section className="input-summary">
          <div className="calc-direction-container res-dir-cont">
            <input
              className="direcrion-from"
              value={data.from_location?.city_name || ''}
            />
            <button type="button" className="calc-swap-button">
              <img src={rightArrow} alt="Поменять местами" className="right-arrow-icon" />
            </button>
            <input
              className="direcrion-to"
              value={data.to_location?.city_name || ''}
            />
            <div className="delivery-type-res">
              <label>
                <span className='del-type-res'>
                  {data.delivery_type === 1
                    ? 'Склад - Склад'
                    : data.delivery_type === 2
                    ? 'Склад - Дверь'
                    : data.delivery_type === 3
                    ? 'Дверь - Склад'
                    : data.delivery_type === 4
                    ? 'Дверь - Дверь'
                    : 'Не указано'}
                </span>
              </label>
            </div>
          </div>
          <div className="calc-package-container res-pack-cont">
            <input
              className="calc-weight-field"
              placeholder="Вес (г)"
              value={data.packages?.[0]?.weight || '0'}
              readOnly
            />
            <input
              className="calc-length-field"
              placeholder="Длина (см)"
              value={data.packages?.[0]?.length || '0'}
              readOnly
            />
            <input
              className="calc-width-field"
              placeholder="Ширина (см)"
              value={data.packages?.[0]?.width || '0'}
              readOnly
            />
            <input
              className="calc-height-field"
              placeholder="Высота (см)"
              value={data.packages?.[0]?.height || '0'}
              readOnly
            />
            <input
              className="calc-date-field"
              value={
                data.shipment_date
                  ? new Date(data.shipment_date).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : 'Не указано'
              }
              readOnly
            />
          </div>
        </section>
        <section className='result-table-section'>
          <div className="results-table">
          <table>
            <tbody>
              {data?.delivery_sum ? (
                <tr>
                  <td className="result-price-column">{data.delivery_sum} ₽</td>
                  <td className="result-date-column">
                    {data.period_min} - {data.period_max} дн. (
                    {formatDate(shipmentDate, data.period_min)} -{' '}
                    {formatDate(shipmentDate, data.period_max)})
                  </td>
                  <td className="result-service-column">{data.service_name}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3">Нет данных</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </section>
      </main>
    </>
  );
}

export default Result;