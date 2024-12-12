import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nav } from "../../data/Data";
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';
import img from '../../images/room.jpg';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Header() {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [toggleTheme, setToggleTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', toggleTheme);
    localStorage.setItem('theme', toggleTheme);
  }, [toggleTheme]);

  function handleLogout() {
    Cookies.remove('token');
    navigate('/signin', { replace: true });
  }

  async function DelAccount() {
    const result = await Swal.fire({
      title: "Hisobni o‘chirish",
      text: "Haqiqatan ham hisobingizni o‘chirmoqchimisiz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ha, o‘chir!",
      cancelButtonText: "Yo‘q, bekor qil!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        await axios.delete('http://localhost:3001/api/profile', {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        });
        Cookies.remove('token');
        navigate('/signin', { replace: true });
        toast.info('Sizning account o`chirildi');
      } catch (err) {
        Swal.fire(
          "Xato!",
          err.response && err.response.status === 422
            ? err.response.data.message
            : "Hisobni o‘chirishda xatolik yuz berdi.",
          "error"
        );
      }
    } else {
      Swal.fire("Bekor qilindi", "Hisobingiz saqlab qolindi.", "info");
    }
  }

  return (
    <header className="position-fixed w-100" id="navbar" style={{ zIndex: '1' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand" to="/" aria-label="Home">
            <img className="navbar__logo-img" src={logo} alt="Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar__item-ul">
              {nav.map((list, index) => (
                <li className="nav-item navbar__item-li" key={index}>
                  <Link to={list.path} onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>
                    {list.text}
                  </Link>
                </li>
              ))}
              {token && (
                <li className="nav-item navbar__item-li">
                  <Link to="dashboard" onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            <div className="navbar__login-page d-flex justify-content-center align-items-center ">
              {/* <Dropdown className="navbar__mode mx-2">
                <Dropdown.Toggle variant="" id="dropdown-basic" aria-label="Toggle theme">
                  <i className={toggleTheme === "light" ? "bi bi-brightness-high-fill" : "bi bi-moon-stars-fill"}></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setToggleTheme("light")}>Light Mode</Dropdown.Item>
                  <Dropdown.Item onClick={() => setToggleTheme("dark")}>Dark Mode</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              {token ? (
                <div className="d-flex align-items-center">
                  <img src={img} alt="Profile" className="border rounded-circle" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                  <Dropdown className="navbar__profile-dropdown">
                    <Dropdown.Toggle variant="link" id="profile-dropdown" aria-label="Profile">
                      Profile
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/myhouses">Elonlar</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      <Dropdown.Item onClick={DelAccount} className="text-danger">Delete Account</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
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
