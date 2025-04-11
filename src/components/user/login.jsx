import React, { useEffect, useState } from "react";
import { Input, Image, Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userAuthFail, userAuthSeccess, userAuthStart } from "../../slice/auth";
import AuthService from "../../service/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [check,setCheck]=useState(false)
  const SubmitData = async (e) => {
    e.preventDefault();
    dispatch(userAuthStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      console.log("From /login:", response);
      dispatch(userAuthSeccess(response));
    } catch (error) {
      dispatch(userAuthFail(error.response.data));
    }
  };
  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex random_Image align-items-center text-center"
    >
      <div className="shadow px-4 py-3 bg-light mx-auto w-25 rounded">
        <Image height="60" width="60" />
        <h3 className="text-warning pb-3">Sign In</h3>
        <Form>
          <FormGroup>
            <Input
              setState={setEmail}
              state={email}
              label="Email Address"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              setState={setPassword}
              state={password}
              label="Password"
              type={check?'text':'password'}
            />
            <div className="d-flex m-2">
            <Input type="checkbox" state={check} setState={setCheck}/>
            <p className="text-darkblue">Show password</p>
            </div>
          </FormGroup>
          <Button
            onClick={SubmitData}
            className="btn-md logo_color_bg mx-2"
            disabled={isLoading}
          >
            {isLoading ? "Login..." : "Login"}
          </Button>
          <Link to={"/register"} className="btn btn-dark btn-md fw-bold mx-2">
            Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
