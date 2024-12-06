import React, { useState, useEffect } from 'react';
import img from '../images/room.jpg';
import Back from '../back/Back';
import Footer from '../home/footer/Footer';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import './style.css'
const Dashboard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    price: "",
    address: "",
    type: "sale", // 'sale' yoki 'rent'
    area: "",
    location: "",
    coordinates: [], // Default coordinates
  });
  const [userLocation, setUserLocation] = useState(null); // Default to Toshkent [41.311081, 69.240562]
  // bu yerda xar doim toshkent ni locationi turish kerak emas, mijozning joylashiviga qarab ozgarish kerak.

  // const handleFindMe = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         const newCoors = [latitude, longitude]
  //         setUserLocation([latitude, longitude]);
  //         setFormData({ ...formData, coordinates: newCoors });
  //       },
  //       (error) => {
  //         console.error('Geolocation error:', error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //     alert("Joylashuvni olishning imkoni bo'lmadi.");
  //   }
  // };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  // const handleMapClick = (e) => {
  //   const coords = e.get("coords");
  //   setFormData({ ...formData, coordinates: coords });
  // };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("E'lon ma'lumotlari:", formData);
    // Example: Sending data to the server
    // fetch("/api/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
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
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Uy rasmi:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Narx (USD):
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      // onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Manzil:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      value={formData.address}
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="row mb-3 ">
                    <div className="col ">
                      <label className="form-label">Tur:</label>
                      <select
                        name="type"
                        className="form-select"
                        value={formData.type}
                        // onChange={handleInputChange}
                      >
                        <option value="sale">Sotuv</option>
                        <option value="rent">Arenda</option>
                      </select>
                    </div>
                    <div className="col ">

                    <label htmlFor="area" className="form-label">
                      Uy maydoni (kv.m):
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      className="form-control"
                      value={formData.area}
                      // onChange={handleInputChange}
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
                        // onClick={handleMapClick}
                      >
                        {/* User-selected marker */}
                        <Placemark geometry={formData.coordinates} />
                          {/* <GeolocationControl onClick={() => handleFindMe()} options={{
                            float: "right", // Position of the button on the map
                          }} /> */}
                        {userLocation && <Placemark geometry={userLocation} />}
                      </Map>
                    </YMaps>
                    {/* <p>
                            Tanlangan koordinatalar: {formData.coordinates[0]},{" "}
                            {formData.coordinates[1]}
                          </p> */}

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
