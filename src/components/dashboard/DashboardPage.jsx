import React, { useState, useEffect } from 'react';
import img from '../images/room.jpg';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import axios from 'axios'
import './style.css'
import Cookies from 'js-cookie'
import { toast } from "react-toastify";
const Dashboard = () => {
  const token = Cookies.get('token')
  const [userLocation, setUserLocation] = useState(null); // Default to Toshkent [41.311081, 69.240562]
  const [houseData, setHouseData] = useState({
    file: null,
    price: "",
    viloyat: "",
    shaxar: "",// 
    tuman: "",
    type: "sell", // 'sale' yoki 'rent'
    tur: "house",// hovli yoki dom,bino
    area: "",
    coordinates: [], // Default coordinates
    comment: "",
    fileName: "",
    fileUrl: "",
  });

  const handleChange = (e) => {
    const { files, name, value } = e.target;
    setHouseData({ ...houseData, [name]: files ? files[0] : value })
  }
  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setHouseData({ ...houseData, coordinates: coords });
  };
  const handleFindMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setHouseData({ ...houseData, coordinates: [latitude, longitude] });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Joylashuvni olishning imkoni bo'lmadi.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (houseData.coordinates.length < 2) {
      toast.error("Xarita joylashuvini korsatish majburiy.");
      return;
    }
    const formData = new FormData();
    Object.entries(houseData).forEach(([key, value]) => {
      if (key === "coordinates" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        // Boshqa kalitlar uchun qiymatni to'g'ridan-to'g'ri yuboramiz
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://localhost:3001/api/dashboard", formData, {
        headers: {
          'x-auth-token': token,  // Fayl bilan yuborilgani uchun Content-Type ni o‘chirib tashlang
        },
      });
      // console.log("Yuborildi!", response);
      // console.log("HouseData!", houseData);
      toast.success("E'lon muvaffaqiyatli qo‘shildi!");
      setHouseData({})
      // setHouseData(); // Tozalash  
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      toast.error("Xatolik yuz berdi.");
    }
  };


  return (
    <>
      <section className="about">
        <Back name="Contact Us" title="Get Help & Friendly Support" cover={img} />
        <section className="contact mt-5 mb-5">
          <div className="container">
            <div className="contact__form border p-4 shadow ">
              <h1
                className="text-warning btnForAddNewHouse mb-3 text-center"
              >
                Yangi e'lon qo'shish
              </h1>

              <form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="image" className="form-label">
                      Uy rasmi:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="file"
                      className="form-control"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="price" className="form-label">
                      Narx (USD):
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      value={houseData.price}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Viloyat:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="viloyat"
                      className="form-control"
                      value={houseData.viloyat}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Shaxar:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="shaxar"
                      className="form-control"
                      value={houseData.shaxar}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="address" className="form-label">
                      Tuman:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="tuman"
                      className="form-control"
                      value={houseData.tuman}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="area" className="form-label ">
                      Uy maydoni (kv.m):
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      className="form-control"
                      value={houseData.area}
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Type:</label>
                    <select
                      name="type"
                      className="form-select"
                      value={houseData.type}
                      onChange={handleChange}
                      required

                    >
                      <option value="sell">Sotuv</option>
                      <option value="rent">Arenda</option>
                    </select>
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="form-label">Uy tur:</label>
                    <select
                      name="tur"
                      className="form-select"
                      value={houseData.tur}
                      onChange={handleChange}
                      required

                    >
                      <option value="house">Hovli</option>
                      <option value="apartment">Do`m</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Comment:
                    </label>
                    <textarea
                      placeholder='Comment'
                      type="text"
                      id="address"
                      name="comment"
                      className="form-control"
                      value={houseData.comment}
                      onChange={handleChange}
                    />
                  </div>

                </div>


                <div className="mb-3">
                  <label className="form-label">Xaritada joyni belgilang:</label>
                  <YMaps>
                    <Map
                      defaultState={{
                        center: [41.311081, 69.240562],
                        zoom: 10,
                      }}
                      width="100%"
                      height="300px"
                      onClick={handleMapClick}
                    >
                      {/* User-selected marker */}
                      <Placemark geometry={houseData.coordinates} />
                      <GeolocationControl onClick={() => handleFindMe()} options={{
                        float: "right", // Position of the button on the map
                      }} required />
                      {userLocation && <Placemark geometry={userLocation} required />}
                    </Map>
                  </YMaps>
                  <p>
                    {/* Tanlangan koordinatalar: {houseData.coordinates[0]},{" "} */}
                    {/* {houseData.coordinates[1]} */}
                  </p>

                </div>

                <button type="submit" className="btn btn-success">
                  Saqlash
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
};

export default Dashboard;
