import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  NavbarComponent,
  Login,
  Register,
  BlogComponent,
  ContactComponent,
  AboutComponent,
  ErrorComponent,
  Profile,
  Dashboard,
  HouseWithId,
  MyHouses,
} from "./components";
import "./constatnts/style.css";
import "./app.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from "react-redux";
import { getItem } from "./helpers/manage-localstory";
import { userAuthFail, userAuthSeccess, userAuthStart } from "./slice/auth";
import AuthService from "./service/auth";
// import {
//   countHouseFail,
//   countHouseSeccess,
//   countHouseStart,
// } from "./slice/houses";
import HouseService from "./service/house";
function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    dispatch(userAuthStart());
    try {
      const response = await AuthService.getUser();
      dispatch(userAuthSeccess(response));
    } catch (error) {
      dispatch(userAuthFail(error.response.data));
    }
  };

  // const getHouseCount = async () => {
  //   dispatch(countHouseStart());
  //   try {
  //     const response = await HouseService.getCountHouse();
  //     dispatch(countHouseSeccess(response));
  //   } catch (error) {
  //     dispatch(countHouseFail(error.response.data?.message));
  //   }
  // };
  useEffect(() => {
    const token = getItem("token");
    if (token) getData();
    // getHouseCount();
  }, []);
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/blog" element={<BlogComponent />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/house/:id" element={<HouseWithId />} />
        <Route path="/myhouses" element={<MyHouses />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </div>
  );
}

export default App;
