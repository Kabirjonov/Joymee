import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logo_name } from "../../constatnts/";
import { Image } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {userLogOut, userLogOutFail}from '../../slice/auth'
import AuthService from "../../service/auth";
import { toast } from "react-toastify";
function NavbarComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user,isLogin} = useSelector((state) => state.auth);
  const LogOut = (e)=>{
    e.preventDefault()
    navigate('/login')
    dispatch(userLogOut())
  }

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      await AuthService.deleteUser();
      dispatch(userLogOut());
      navigate('/register');
    } catch (error) {
      toast.error(error.response.data?.message || "Something went wrong, Please try later");
      dispatch(userLogOutFail(error.response.data?.message));
    }
  };
  
  return (
    <>
      <Navbar expand="lg" className="py-2 d-flex  w-100 fixed-top bg-white shadow">
        <Container>
          <Navbar.Brand as={Link} className="fw-bold" to="/">
            <Image height="50" />
            {logo_name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto text-center">
              <Nav.Link as={Link} className="fw-bold" to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} className="fw-bold" to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} className="fw-bold" to="/blog">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} className="fw-bold" to="/contact">
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {isLogin&&user!==null ? (
                <Dropdown align="end" className="mx-auto">
                  <Dropdown.Toggle
                    split
                    variant=""
                    className="text-darkblue border-0"
                    id="dropdown-split-basic"
                  >
                    <Image height="50" url={user.fileUrl} circle />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><Link to={'/profile'}>Profile</Link></Dropdown.Item>
                    <Dropdown.Item><Link to={'/dashboard'}>Dashboard</Link></Dropdown.Item>
                    <Dropdown.Item><Link to={'/myhouses'}>My Houses</Link></Dropdown.Item>
                    <Dropdown.Item   onClick={LogOut}>
                      Lay Out
                    </Dropdown.Item>
                    <Dropdown.Item  className="bg-danger text-light" onClick={deleteUser}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  className="logo_color_bg btn-md rounded fw-bold text-center"
                  to="/login"
                >
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
