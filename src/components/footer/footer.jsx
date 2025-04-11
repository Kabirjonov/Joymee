import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { Button, Image, Input } from "../../ui";
import { logo_name } from "../../constatnts";
import { footer } from "../data/data";
function Footer() {
  return (
    <>
      <div className="logo_color_bg sm-none">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 my-auto">
              <h1 className="fw-bold">Do you have Questions?</h1>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="col-6 text-end my-auto">
              <Link
                to={"/contact"}
                className="btn text-uppercase btn-dark logo_color_text footer_btn_style"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darkblue py-4 border-bottom border-secondary">
        <div className="container py-2">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <div className="d-flex">
                <Image height="60" width="60" />
                <h2 className="text-light my-auto">{logo_name}</h2>
              </div>
              <h3 className="text-light">Do you need help with anything?</h3>
              <p className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                asperiores reprehenderit rem culpa quis voluptatibus?
              </p>
              <div className="d-flex">
                <Input label="Email Address" />
                <Button>Submit</Button>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 sm-none">
              <div className="row mx-auto">
                {footer.map((val,index) => (
                  <div className="col-sm-4 text-center " key={index}> 
                    <h5 className="text-light">{val.title}</h5>
                    <ul className="m-0">
                      {val.text.map((item,index2) => (
                        <li className="text-secondary p-1 mx-auto" key={index2}>
                          {item.list}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-darkblue text-center py-1">
        <p className="text-secondary">Create by alex</p>
      </div>
    </>
  );
}

export default Footer;
