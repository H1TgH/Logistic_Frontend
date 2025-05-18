import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.svg';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const updateUser = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <div className="logo-nav">
        <Link className="logo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <nav>
        <Link className="home-link" to="/">Главная</Link>
        <Link className="calculate-link" to="/calculate">Рассчитать стоимость</Link>
        <Link className="about-link" to="/about">О нас</Link>
        <Link className="reviews-link" to="/reviews">Отзывы</Link>

        {!user ? (
          <>
            <Link className="login-link" to="/login">Вход</Link>
            <Link className="register-link" to="/register">Регистрация</Link>
          </>
        ) : (
          <div className="user-menu">
            <span className="username" onClick={toggleDropdown}>
              {user.username}
            </span>
            {dropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Личный кабинет
                  </Link>
                </div>
                <div className="dropdown-item logout-item">
                  <button className="logout-button" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;