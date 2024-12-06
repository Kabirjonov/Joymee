import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nav } from "../../data/Data";
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';
import img from '../../images/room.jpg'

export default function Header() {
  const token = Cookies.get('token')
  const navigate = useNavigate();
  const [toggleTheme, setToggleTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Tema o'zgarishlarini saqlash va dasturga qo'llash
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', toggleTheme);
    localStorage.setItem('theme', toggleTheme);
  }, [toggleTheme]);

  // Logout funksiyasi
  function handleLogout() {
    Cookies.remove('token');  // Tokenni o'chirish
    navigate('/signin', { replace: true });  // Sign In sahifasiga yo'naltirish
  }

  return (
    <header className="position-fixed w-100" id="navbar" style={{ zIndex: '1' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand" to="/" aria-label="Home">
            <div className="logo">
              <img className="navbar__logo-img" src={logo} alt="Logo" />
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar__item-ul">
              {nav.map((list, index) => (
                <li className="nav-item navbar__item-li" key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
              {token && (
                <li className="nav-item navbar__item-li">
                  <Link to="dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
            <div className="navbar__login-page d-flex align-items-center">
              <Dropdown className="navbar__mode mx-2">
                <Dropdown.Toggle variant="" id="dropdown-basic" aria-label="Toggle theme">
                  <i className={toggleTheme === "light" ? "bi bi-brightness-high-fill" : "bi bi-moon-stars-fill"}></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setToggleTheme("light")}>
                    <i className="bi bi-brightness-high-fill"></i> Light Mode
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setToggleTheme("dark")}>
                    <i className="bi bi-moon-stars-fill"></i> Dark Mode
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Agar foydalanuvchi tizimga kirgan bo'lsa, Profile ko'rsatiladi */}
              {token ? (
                <Dropdown className="navbar__profile-dropdown">
                  <Dropdown.Toggle variant="link" id="profile-dropdown" aria-label="Profile">
                    <img
                      // src="https://picsum.photos/id/456/1200/600"
                      src={img}
                      alt="Profile"
                      className="border rounded-circle"
                      style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item>
                      <button onClick={handleLogout} className="btn btn-link p-0 text-start">Logout</button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                // Agar foydalanuvchi tizimga kirgan bo'lmasa, Sign In ko'rsatiladi
                <Link to="/signin" className="btn1" aria-label="Sign In">
                  <i className="bi bi-box-arrow-right"></i> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
