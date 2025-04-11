import React from "react";
import { Head } from "../";
import "./style.css";
function Awards() {
  return (
    <div className="text-center bg-darkblue text-light py-5">
      <div className="container d-flex mx-auto flex-column">
        <main role="main" className="inner cover">
          {/* <Head
            title="Over 1,24,000+ Happy Users Being With Us Still They Love Our Services"
            subtitle="Online Booking"
            className="text-warning fw-bold"
          /> */}
            <Head
            title='This page is not ready yet!'
            text="We’re working hard to bring you something great. Please check back soon!"
            subtitle="Online Booking"
            className="text-warning fw-bold"
          />
          {/* <div className="row">
            {}
            <div className="col-6 col-sm-4 col-md-3 col-lg-3"> 
              <div className="awards__icon">
                <span>icon</span>
              </div>
              <h1>24</h1>
            <p className="text-secondary">Blue Burmin Award</p>
           </div>
           
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default Awards;
