import React, { useState } from 'react';
import img from '../images/room.jpg';
import Basic from '../OtherPageStyle/basic';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const Dashboard = () => {
  const token = Cookies.get('token');
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultMap, setDefaultMap] = useState([41.311081, 69.240562]);
  const [houseData, setHouseData] = useState({
    files: [],
    price: "",
    viloyat: "",
    shaxar: "",
    tuman: "",
    type: "sell",
    tur: "house",
    area: "",
    coordinates: [],
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "files") {
      if (files.length < 3 || files.length > 5) {
        toast.error("File 3 dan 5 gacha bo'lishi kerak!");
        return;
      }
      setHouseData({ ...houseData, files: Array.from(files) });
    } else {
      setHouseData({ ...houseData, [name]: value });
    }
  };

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
          setDefaultMap([latitude, longitude]);
          setHouseData({ ...houseData, coordinates: [latitude, longitude] });
        },
        () => {
          toast.error("Joylashuvni olishning imkoni bo'lmadi.");
        }
      );
    } else {
      toast.error("Geolocation brauzerda qo'llab-quvvatlanmaydi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (houseData.files.length < 3 || houseData.files.length > 5) {
      toast.error("Fayllar soni 3 dan 5 gacha bo'lishi kerak.");
      setIsLoading(false);
      return;
    }

    if (houseData.coordinates.length < 2) {
      toast.error("Xarita joylashuvini ko'rsatish majburiy.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(houseData).forEach(([key, value]) => {
      if (key === "coordinates" && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === "files") {
        value.forEach((file) => formData.append("files", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard`, formData, {
        headers: { 'x-auth-token': token },
      });
      toast.success("E'lon muvaffaqiyatli qo'shildi!");
      setHouseData({
        files: [],
        price: "",
        viloyat: "",
        shaxar: "",
        tuman: "",
        type: "sell",
        tur: "house",
        area: "",
        coordinates: [],
        comment: "",
      });
    } catch (error) {
      toast.error("Xatolik yuz berdi.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Basic name="Contact Us" title="Get Help & Friendly Support" cover={img}>
        <h1 className="text-warning btnForAddNewHouse mb-3 text-center">
          Yangi e'lon qo'shish
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 mb-3">
              <label className="form-label">Uy rasmlari (3-5):</label>
              <input
                type="file"
                name="files"
                className="form-control"
                onChange={handleChange}
                multiple
                required
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Narx (USD):</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={houseData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Viloyat:</label>
              <input
                type="text"
                name="viloyat"
                className="form-control"
                value={houseData.viloyat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Shaxar:</label>
              <input
                type="text"
                name="shaxar"
                className="form-control"
                value={houseData.shaxar}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Tuman:</label>
              <input
                type="text"
                name="tuman"
                className="form-control"
                value={houseData.tuman}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="form-label">Uy maydoni (kv.m):</label>
              <input
                type="number"
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
              <label className="form-label">Uy turi:</label>
              <select
                name="tur"
                className="form-select"
                value={houseData.tur}
                onChange={handleChange}
                required
              >
                <option value="house">Hovli</option>
                <option value="apartment">Do'm</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Izoh:</label>
              <textarea
                name="comment"
                className="form-control"
                value={houseData.comment}
                onChange={handleChange}
                placeholder="Izoh yozing"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Xaritada joyni belgilang:</label>
            <YMaps>
              <Map
                defaultState={{ center: defaultMap, zoom: 10 }}
                width="100%"
                height="300px"
                onClick={handleMapClick}
              >
                <Placemark geometry={houseData.coordinates} />
                <GeolocationControl onClick={handleFindMe} options={{ float: "right" }} />
              </Map>
            </YMaps>
          </div>

          <button type="submit" className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Yuklanmoqda..." : "Yuklash"}
          </button>
        </form>
      </Basic>
    </>
  );
};

export default Dashboard;
