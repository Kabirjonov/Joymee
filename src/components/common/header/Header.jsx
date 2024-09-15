import React from 'react'
import { Link } from 'react-router-dom'
import { nav } from "../../data/Data"
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css'
export default function Header() {
  return (
    <header className='position-fixed w-100' style={{zIndex:'1'}}>
      <nav class="navbar navbar-expand-lg bg-body">
        <div class="container d-flex align-items-center">
          <a class="navbar-brand" href="#">
            <div className="logo">
              <img className='navar__logo-img' src={require('../../images/logo.png')} alt="Logo" />
            </div></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 navbar__item-ul">
              {nav.map((list, index) => (
                <li class="nav-item navbar__item-li" key={index}><Link to={list.path}>{list.text}</Link></li>
              ))}
            </ul>
            
            <div className="navar__login-page">
              <button className='btn1'><i class="bi bi-box-arrow-right"></i>Sign In</button>
                <Dropdown className="navbar__Mode">
                  <Dropdown.Toggle variant="" id="dropdown-basic">
                    <i class="bi bi-brightness-high-fill"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><i class="bi bi-brightness-high-fill"></i></Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><i class="bi bi-moon-stars-fill"></i></Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><i class="bi bi-circle-half"></i></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div> 
          </div>
        </div>
      </nav>
    </header>
  )
}
