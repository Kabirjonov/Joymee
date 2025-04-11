import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersFail,
  getUsersSeccess,
  getUsersStart,
} from "../../../slice/auth";
import AuthService from "../../../service/auth";
import { Image, Loader } from "../../../ui";

function SlideAgents() {
  const dispatch = useDispatch();
  const { users ,isLoading} = useSelector((state) => state.auth);
  const getUsers = async () => {
    dispatch(getUsersStart());
    try {
      const response = await AuthService.getUsers();
      dispatch(getUsersSeccess(response));
    } catch (error) {
      dispatch(getUsersFail(error.response.data));
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const settings = {
    infinite: true,
    // speed: 500,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,
      cssEase: "linear",
  };
  return (
    <div className="slider-container">
      {isLoading&&<Loader/>}
      <Slider {...settings}>
        
        {users.map((user, index) => (
          <div className="card mx-auto p-2 shadow w-75" style={{height:"18rem"}} key={index} >
            <div className="d-flex justify-content-center">
              <Image circle url={user.fileUrl} />
            </div>
            <div className="card-body mx-auto">
              <h4 className="card-title">
                {user.firstName + " " + user.lastName}
              </h4>
              <p className="card-text">{user.bio}</p>
              <p>Call: {user.phone}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideAgents;
