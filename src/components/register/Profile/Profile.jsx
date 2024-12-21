  import React, { useState, useEffect ,useContext} from 'react';
  import img from '../../images/room.jpg';
  import { IoPersonSharp } from "react-icons/io5";
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { ToastContainer, toast } from 'react-toastify';
  import './profile.css';
  import { MdDelete } from "react-icons/md";
  import { MdAddAPhoto } from "react-icons/md";
  import Basic from '../../OtherPageStyle/basic';
import { ClientContext } from './ProfileContext';

  export default function Profile() {
    const {setClient}=useContext(ClientContext)
    const token = Cookies.get('token')
    const [check,setCheck]=useState(0)
    const [editing, setEditing] = useState(false)
    const [userData, setUserData] = useState({
      lastName: '',
      email: '',
      phone: '',
      birthday: '',
      gender: '',
      bio: '',
      firstName: '',
      file: null,
      fileUrl: '',
    })

    const handleChange = (event) => {
      const { name, value } = event.target;
      setUserData(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
    const handleSave = async (e) => {
      e.preventDefault();
      try {
        // Tug‘ilgan kunni tekshirish va ISO formatga aylantirish
        let birthdayDate = null;
        if (userData.birthday && !isNaN(Date.parse(userData.birthday))) {
          birthdayDate = new Date(userData.birthday).toISOString();
        }

        // FormData yaratish
        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('email', userData.email);
        formData.append('phone', userData.phone);
        formData.append('birthday', birthdayDate || '');
        formData.append('gender', userData.gender);
        formData.append('bio', userData.bio);

        // Rasm tanlanganligini tekshirish
        if (userData.file) {
            formData.append('file', userData.file);
        }
        console.log("Backendga Janatilyotgan malumotlar: ", formData)
        // So‘rov yuborish
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/profile`, formData, {
          headers: {
            'x-auth-token': token,  // Fayl bilan yuborilgani uchun Content-Type ni o‘chirib tashlang
          },
        });

        // Foydalanuvchini yangilash
        const updatedUser = response.data.UploadUser;
        setUserData({
          // ...prevState,
          ...updatedUser,
        });
        setClient({
          ...updatedUser,
        })

        toast.success(response.data.message || 'Upload is successfully');
        setEditing(false)
      } catch (err) {
        console.error('Error uploading file:', err);
        toast.error(err.message || 'Error uploading file');
      }
    };

    useEffect(() => {
      const fetch = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json',
            },
          })
          // console.log('userData Data befor changing',userData)

          setUserData({
            ...response.data,
            birthday: new Date(response.data.birthday).toISOString().split('T')[0], // YYYY-MM-DD formatiga o'zgartirish
          });
          setClient({
            ...response.data,
            birthday: new Date(response.data.birthday).toISOString().split('T')[0], 
          })
          console.log('backenda get metodi bilan oninayotgan malumot',response.data)
          setCheck(1)
        } catch (err) {
          toast.error(err.message)
        }
      }
      fetch()
    }, [token])
    useEffect(() => {
      // console.log(userData)
      console.log('olingan malumotni userDataga yozilishi',userData)

      // console.log(userData.fileUrl)
    }, [check])
    return (
      <>
      <ToastContainer className="position-absolute"/>
              <Basic name="Your Profile" title="Your settings" cover={img} >
              <form  onSubmit={handleSave}>
                <div className="mb-4 m-auto profile-container" style={{ width: '120px', height: '120px', position: 'relative' }}>
                  {userData.fileUrl ? (
                    <img
                      src={userData.fileUrl}
                      // alt="Profile"
                      className="rounded-circle border border-dark w-100 h-100"
                    />
                  ) : (
                    <IoPersonSharp className="icon_forPerson rounded-circle border border-dark w-100 h-100" />
                  )}
                

                  {editing && (
                    <>
                      <label htmlFor="profileImageUpload" className="add_Person_Image">
                        <MdAddAPhoto />
                      </label>
                      <input
                        id="profileImageUpload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                              setUserData(prevState => ({
                                  ...prevState,
                                  file: e.target.files[0],
                                  fileUrl: URL.createObjectURL(e.target.files[0]) // Rasmni oldindan ko‘rsatish
                              }));
                          }
                      }}
                      />
                    </>
                  )}
                </div>
          
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name='firstName'
                      value={userData.firstName}
                      onChange={handleChange}
                      disabled={!editing}
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name='lastName'
                      value={userData.lastName}
                      onChange={handleChange}

                      // onChange={(e) => setUserData(...e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control"
                      name='email'
                      value={userData.email}
                      disabled />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name='phone'
                      value={userData.phone}

                      disabled
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={userData.birthday}
                      name='birthday'
                      onChange={handleChange}

                      // onChange={(e) => setUserData(...e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={userData.gender}
                      name='gender'
                      // onChange={(e) => setUserData(...e.target.value)}
                      onChange={handleChange}
                      disabled={!editing}
                    >
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      name='bio'
                      value={userData.bio}
                      // onChange={(e) => setUserData(...e.target.value)}
                      onChange={handleChange}
                      disabled={!editing}
                      rows="3"
                    ></textarea>
                  </div>
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
                        type="submit"
                        className="btn btn-success"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </form>
              </Basic>
              
      </>
    );
  }
