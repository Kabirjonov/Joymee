import React, { useState,useContext } from 'react';
import img from '../../images/room.jpg';
import Back from '../../back/Back';
import Footer from '../../home/footer/Footer';
import { Row, Col } from 'reactstrap';
import axios from 'axios'
import './profile.css'
import { toast, ToastContainer } from 'react-toastify';
import { IoPersonSharp } from "react-icons/io5";
import {TokenContext} from '../TokenProvider/TokenContext'
import Cookies from 'js-cookie'

export default function Profile() {
  // const { token } = useContext(TokenContext);

  const getJwtPayload = (token) => {
    if (!token) return null;
    
    const base64Url = token.split('.')[1]; // Tokenni "." bilan bo'lish va payloadni olish
    const base64 = base64Url.replace('-', '+').replace('_', '/'); // Base64 URL-safe formatini to'g'rilash
    const decoded = JSON.parse(atob(base64)); // Base64-ni dekodlash va JSON-ga aylantirish
    return decoded;
};
const token = Cookies.get('token')
const payload = getJwtPayload(token)
console.log(payload)



  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert("Profile saved!");
  };

  return (
    <>
      <section className="about">
        <ToastContainer />
        <Back name="Your Profile" title="Your setting own" cover={img} />
        <section className="contact mt-5 mb-5">
          <div className="container">
            <form className="contact__form border p-4 shadow">
              {/* <div className="container mt-5"> */}
                {/* <div className="card shadow p-4"> */}
                  {/* Profile Picture */}
                  <div className="text-center mb-4 ">
                    {/* <img  
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROY6iasJSWW0mWpFuA1AGnKpdb68PfXfWMg&s"
                      alt="profile"
                      className="rounded-circle"
                    /> */}
                    <IoPersonSharp className='icon_forPerson rounded-circle border border-dark'/>
                    {/* <button className="btn btn-secondary btn-sm mt-2">📸 Edit</button> */}
                  </div>

                  {/* Form */}
                  <form className='row'>
                    {/* First Name */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onCh  ange={(e) => setFirstName(e.target.value)}
                        disabled={!editing}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!editing}
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          disabled
                        />
                        {/* <span className="input-group-text text-success">✔ Verified</span> */}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Phone Number</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) =>setPhone(e.target.value)}
                          disabled={!editing}
                        />
                        {/* <span className="input-group-text text-success">✔ Verified</span> */}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        disabled={!editing}
                      />
                    </div>

                    {/* Country */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        value={country}
                        onChange={(e) =>setCountry(e.target.value)}
                        disabled={!editing}
                      >
                        <option value="Bangladesh">Man</option>
                        <option value="India">Woman</option>
                      </select>
                    </div>

                    {/* Bio */}
                    <div className="mb-3">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        disabled={!editing}
                        rows="3"
                      ></textarea>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setEditing(!editing)}
                      >
                        {editing ? "Cancel" : "Edit"}
                      </button>
                      {editing && (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </form>
                {/* </div> */}
              {/* </div> */}
            </form>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}
