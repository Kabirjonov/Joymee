import React, { useEffect, useState } from "react";
import { Basic, Button, Image, Input, Loader } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { userAuthFail, userAuthSeccess, userAuthStart } from "../../slice/auth";
import AuthService from "../../service/auth";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [disabled, setDisabled] = useState(true);
  const {user,isLoading} = useSelector((state) => state.auth);
  const [file,setFile]=useState(null)
  const dispatch = useDispatch();

  const saveSend = async (e) => {
    e.preventDefault();
    dispatch(userAuthStart());
    try {
      const updateuser = {firstName,lastName,email,phone,birthday,gender,bio,file};
      const response = await AuthService.putUser(updateuser);
      dispatch(userAuthSeccess(response));
      setDisabled(true);
    } catch (error) {
      dispatch(userAuthFail(error.response.data));
    }
  };
  const getUser = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setBirthday(formatDate(user.birthday));
    setGender(user.gender);
    setBio(user.bio);
  };
  useEffect(() => {
    if (user !== null) getUser();
  }, [user]);


  const editHandle = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };
  function formatDate(dateString){
    return new Date(dateString).toISOString().split("T")[0];
  };
  const handleFile=(e)=>{
    e.preventDefault()
    setFile(e.target.files[0])
  }
  return (
    <Basic name="Profile" title="Your  setting">
      {user !== null && (
        <form className="px-2">
          <div className="d-grid justify-content-center">
            {disabled ? (
              <Image circle height="100" url={user.fileUrl} />
            ) : (
              <>
                <label
                  htmlFor="profileImageUpload"
                  className="border rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    height: "100px",
                    width: "100px",
                    cursor: "pointer",
                    overflow: "hidden",
                    background: "#f0f0f0",
                  }}
                >
                  {file ? (
                    <img src={URL.createObjectURL(file)} className="w-100 h-100" alt="ProfileImage"/>
                  ) : (
                    <span className="text-muted">+</span>
                  )}
                </label>
                   <input
                  type="file"
                  onChange={handleFile}
                  accept="image/*"
                  id="profileImageUpload"
                  style={{ display: "none" }}
                />
              </>
            )} 
          </div>
          <div className="row mt-5">
            <div className="col-md-6 col-sm-12">
              <Input
                label="First Name"
                state={firstName}
                setState={setFirstName}
                disabled={disabled}
                id='name'
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Input
                label="Last Name"
                state={lastName}
                setState={setLastName}
                disabled={disabled}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Input
                label="Email address"
                type={"email"}
                state={email}
                name="email"
                setState={setEmail}
                disabled={true}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Input
                label="Phone number"
                state={phone}
                name="phone"
                setState={setPhone}
                disabled={true}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Input
                label="BirthDay"
                type={"date"}
                state={birthday}
                name="birthday"
                setState={setBirthday}
                disabled={disabled}
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <Input
                label="gender"
                name="gender"
                state={gender}
                setState={setGender}
                type={"dropdown"}
                options={["male", "Female"]}
                disabled={disabled}
              />
            </div>
            <div className="col-md-12 col-sm-12">
              <Input
                label="Bio"
                state={bio}
                setState={setBio}
                disabled={disabled}
                type="textarea"
                required={false}
              />
            </div>
          </div>
          <div className="d-flex  justify-content-between m-2 ">
            <Button
              className={disabled ? "logo_color_bg" : "btn-secondary"}
              onClick={editHandle}
            >
              {disabled ? "Edit" : "Cencel"}
            </Button>
            {!disabled && (
              <Button className="btn-success" onClick={saveSend} disabled={isLoading} >
                {isLoading?"Save...":'Save'}
              </Button>
            )}
          </div>
        </form>
      )
      }
    </Basic>
  );
}

export default Profile;
