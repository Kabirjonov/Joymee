import React from "react";
import { Head } from "..";
import { Loader } from "../../../ui";
import { useSelector } from "react-redux";
import CountUp from 'react-countup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHandshake, faBuilding } from "@fortawesome/free-solid-svg-icons";

function Feature() {
  const { count, sell, rent } = useSelector((state) => state.house);

  // Dinamik featured list
  const featured = [
    {
      title: "For Sell",
      count: sell,
      icon: faHouse,
      text: "Number of houses currently for sale.",
    },
    {
      title: "For Rent",
      count: rent,
      icon: faHandshake,
      text: "Number of houses for rent.",
    },
    {
      title: "All",
      count: count,
      icon: faBuilding,
      text: "Total number of available homes.",
    },
  ];

  return (
    <div className="bg-light">
      <div className="container text-center py-5">
        <Head
          title="Featured Property Types"
          text="Bizda mavjud bo'lgan turli xil uy turlari bilan tanishing."
        />
        <div className="row">
          {count === null || count === undefined ? (
            <Loader />
          ) : (
            featured.map((item, index) => (
              <div className="col-lg-3 mx-auto"  key={index}>
                <div className="shadow p-4 mb-2" style={{height:'15rem'}}>
                  <FontAwesomeIcon icon={item.icon} size="3x" className="mb-3 text-darkblue" /> {/* Icon qo‘shildi */}
                  <h2>{item.title}</h2>
                  <h4>
                    <CountUp start={0} end={item.count} duration={5} separator="," />
                  </h4> 
                  <p>{item.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Feature;
