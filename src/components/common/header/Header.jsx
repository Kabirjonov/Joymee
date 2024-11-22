import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nav } from "../../data/Data";
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css';
import logo from '../../images/logo.png';

export default function Header() {
  const [toggleTheme,setToggleTheme]= useState('light')
  useEffect(()=>{
    
  },[toggleTheme])
  return (  
    <header className='position-fixed w-100 ' id='navbar' style={{ zIndex: '1' }}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand" to="/" aria-label="Home">
            <div className="logo">
              <img className='navbar__logo-img' src={logo} alt="Logo" />
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
            </ul>
            <div className="navbar__login-page d-flex align-items-center">
              <Link to={'/signin'} className='btn1' aria-label="Sign In">
                <i className="bi bi-box-arrow-right"></i> Sign In
              </Link>
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
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
