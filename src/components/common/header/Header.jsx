import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nav } from "../../data/Data";
import Dropdown from 'react-bootstrap/Dropdown';
import './header.css';
import logo from '../../images/logo.png';
import Cookies from 'js-cookie';
import img from '../../images/room.jpg';
import axios from 'axios';
import { toast } from "react-toastify";
import { IoPersonSharp } from "react-icons/io5";
// import Swal from "sweetalert2";
import {useLanguage}from '../../changeLanguage/changer'

export default function Header() {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const [toggleTheme, setToggleTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [ImageUrl, setImageUrl] = useState('')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', toggleTheme);
    localStorage.setItem('theme', toggleTheme);
  }, [toggleTheme]);
  useEffect(() => {
    const getUserImage = async () => {
      try{
        const getUrl = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/image`,{
          headers: {
            'x-auth-token': token,
          },
        })
        console.log('Rasm Url Backendan Kelgan')
        setImageUrl(getUrl.data.imageUrl)
      }catch(err){
        setImageUrl('')
      }

    }
    getUserImage()
  }, [])
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
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/profile`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 204) {
        Cookies.remove('token');
        navigate('/signin', { replace: true });
        toast.info(response.data.message);
      }
      
    } catch (err) {
      Swal.fire(
        "Xato!",
        err.response && err.response.status === 422
          ? err.response.data.message
          : "Hisobni o‘chirishda xatolik yuz berdi.",
        "error"
      );
      if (err.response.status === 422) {
        toast.error(`Account o\`chirishdan oldin e\`lonlarni ochiring`,);

      }

    }

    } else {
    Swal.fire("Bekor qilindi", "Hisobingiz saqlab qolindi.", "info");
    }
  }

  

  // tilni ozgartirish 
  const {language,changeLanguage,tranlation}=useLanguage()
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
          <div className="collapse navbar-collapse p-3" style={{ background: 'var(--bone)' }} id="navbarSupportedContent">
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
                 {/* <Dropdown className="navbar__mode mx-2">
                <Dropdown.Toggle variant="" id="dropdown-basic" aria-label="Toggle theme" className='text-capitalize'>
                  {language}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('uz')}>Uz</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('eng')}>Ing</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ru')}>Rus</Dropdown.Item>
            
                </Dropdown.Menu>
              </Dropdown> */}
              {/* bu yerda til tanlash functionalnisi ishladi lekin mening xammasini 3 tilga ogishga xoxishim bolmadi */}
              {token ? (
                <div className="d-flex align-items-center">
                  {ImageUrl.length==0 ? (
                    <IoPersonSharp className="rounded-circle border border-dark" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                  ) : (
                    <img src={ImageUrl} className="border rounded-circle" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                  )}
                  <Dropdown className="navbar__profile-dropdown">
                    <Dropdown.Toggle variant="link" id="profile-dropdown" aria-label="Profile">
                      Setting
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile" className='text-primary' onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/myhouses" className='text-primary' onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Elonlar</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}><div onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Logout</div></Dropdown.Item>
                      <Dropdown.Item onClick={DelAccount} className="text-danger"><div onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>Delete Account</div></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Link to="/signin" className="btn1" aria-label="Sign In" onClick={() => document.querySelector('.navbar-collapse').classList.remove('show')}>
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
