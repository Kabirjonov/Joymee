import React from "react";
import Back from "./back";
import { Footer } from "../components/home";
import {ToastContainer}from 'react-toastify'
import { useSelector } from "react-redux";
import Loader from "./loader";
function Basic({ name, title, children, check = true }) {
  const { isLoading: houseLoading } = useSelector(state => state.house);
const { isLoading: authLoading } = useSelector(state => state.auth);

  return (
    <section className="about">
      <ToastContainer/>
      <Back name={name} title={title} />
      <section className="my-5">
        <div className="container">
          {check ? (
            <div className={`contact__form border p-4 shadow`}> {(houseLoading || authLoading) && <Loader />}{children}</div>
          ) : (
            <>
             {(houseLoading || authLoading) && <Loader />}
            {children}
            
            </>
          )}
        </div>
      </section>
      <Footer />
    </section>
  );
}

export default Basic;
