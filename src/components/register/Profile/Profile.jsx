import React, { useState, useEffect } from 'react';
import img from '../../images/room.jpg';
import Back from '../../back/Back';
import Footer from '../../home/footer/Footer';
import { IoPersonSharp } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import './profile.css';
import { MdAddAPhoto } from "react-icons/md";

export default function Profile() {
  const token = Cookies.get('token'); // Tokenni cookie dan olish
  // Foydalanuvchi ma'lumotlari uchun useState
  const [profileImage, setProfileImage] = useState(null)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [editing, setEditing] = useState(false); // Formani tahrir qilish holati

  useEffect(() => {
    // Backendga foydalanuvchi ma'lumotlarini olish uchun so'rov yuborish
    axios.get('http://localhost:3001/api/profile', {
      headers: { 'x-auth-token': token },
    })
      .then((response) => {
        const userData = response.data;

        // Tuganlanadigan sana formatini YYYY-MM-DD ga aylantirish
        const formattedBirthday = userData.birthday
          ? new Date(userData.birthday).toISOString().split('T')[0]
          : ''; // Faqat YYYY-MM-DD qismini olish
        setProfileImage(userData.profileImage || '')
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setBirthday(formattedBirthday); // Formatlangan sana
        setCountry(userData.gender || '');
        setBio(userData.bio || ''); // Bio ma'lumotini oling
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [token]); // Tokenni dependency sifatida ko'rsatish


  const senderImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result); // Faylni preview qilish
      reader.readAsDataURL(file);
      // Rasmni backendga yuborish
      const formData = new FormData();
      formData.append('profileImage', file);
      axios
        .post('http://localhost:3001/api/upload-profile-image', formData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          toast.success('Profile image updated!');
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to upload image.');
        });
    }

  }
  // Profile saqlash
  const handleSave = () => {
    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      birthday: new Date(birthday).toISOString(),
      country,
      bio
    };

    axios.put('http://localhost:3001/api/profile', updatedData, {
      headers: { 'x-auth-token': token },
    })
      .then(() => {
        toast.success("Profile saved!");
        setEditing(false); // Tahrir qilishni tugatish
      })
      .catch((error) => {
        toast.error("Failed to save profile.");
        console.error('Error saving profile:', error);
      });
  };

  return (
    <>
      <section className="about">
        <ToastContainer />
        <Back name="Your Profile" title="Your setting own" cover={img} />
        <section className="contact mt-5 mb-5">
          <div className="container">
            <form className="contact__form border p-4 shadow">
              <div className="mb-4 m-auto" style={{ width: '120px', height: '120px', position: 'relative' }}>
                {/* Profile Image yoki Icon */}
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle border border-dark w-100 h-100"
                  />
                ) : (
                  <IoPersonSharp className="icon_forPerson rounded-circle border border-dark w-100 h-100" />
                )}
                {/* Rasmni yuklash inputi */}
                <label
                  htmlFor="profileImageUpload"
                  className='add_Person_Image'
                >
                  <MdAddAPhoto />
                  </label>
                <input
                  id="profileImageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => senderImg(e)}
                />
              </div>
              {/* Form */}
              <div className='row'>
                {/* First Name */}
                <div className="mb-3 col-lg-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    disabled
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-3 col-lg-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editing}
                  />
                </div>

                {/* Date of Birth */}
                <div className="mb-3 col-lg-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    disabled={!editing}
                  />
                </div>

                {/* Country */}
                <div className="mb-3 col-lg-6">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
                    onClick={() => setEditing(!editing)} // "Edit" va "Cancel" uchun
                  >
                    {editing ? "Cancel" : "Edit"}
                  </button>
                  {editing && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSave} // Save tugmasi
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </section>
    </>
  );
}
