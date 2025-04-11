import React, { useEffect, useState } from "react";
import { Input, Image, Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStart, userAuthSeccess, userAuthFail } from "../../slice/auth";
import { ValidationError } from "../";
import { validatePhoneNumber } from "../validate/validatePhoneNumber";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+9989");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();
  const { isLoading, isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const SubmitData = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(phone)) {
      alert('Phone number is wrong.');
      return;
  }
    const user = {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      gender,
      password,
    };
    dispatch(userAuthStart());
    try {
      const data = await AuthService.userRegister(user);
      dispatch(userAuthSeccess(data));
    } catch (error) {
      dispatch(userAuthFail(error.response.data));
    }
  };
  useEffect(() => {
    if (isLogin) navigate("/");
    console.log('Phone length:',phone.length)
  }, [isLogin]);
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex random_Image align-items-center text-center"
    >
      <div className="shadow px-4 py-3 bg-light mx-auto w-50 rounded">
        <Image height="60" width="60" />
        <h3 className="text-warning pb-3">Sign In</h3>
        <ValidationError />
        <form onSubmit={SubmitData} className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="First name"
              name="firstName"
              setState={setFirstName}
              state={firstName}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="Last name"
              state={lastName}
              name="lastName"
              setState={setLastName}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="Email address"
              type={"email"}
              state={email}
              name="email"
              setState={setEmail}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="Phone number"
              state={phone}
              name="phone"
              setState={setPhone}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="BirthDay"
              type={"date"}
              state={birthday}
              name="birthday"
              setState={setBirthday}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
            <Input
              label="gender"
              name="gender"
              state={gender}
              setState={setGender}
              type={"dropdown"}
              options={["male", "female"]}
            />
          </div>
          <div className="col-md-12 col-lg-12 col-sm-12">
            <Input
              label="Password"
              state={password}
              name="password"
              setState={setPassword}
              type={check ? "text" : "password"}
            />
          </div>
          <div className="d-flex m-2">
            <Input type="checkbox" state={check} setState={setCheck} />
            <p className="text-darkblue">Show password</p>
          </div>
        </form>
        <Button
          onClick={SubmitData}
          disabled={isLoading}
        >
          {isLoading ? "Register..." : "Register"}
        </Button>
        <Link to={"/login"} className="btn btn-dark btn-md fw-bold mx-2">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
