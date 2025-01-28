import React, { useState } from 'react';
import '../style.css';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { validatePhoneNumber } from '../validators'; 
import Cookies from 'js-cookie';

const SignUp = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '+9989',
        birthday: '',
        password: '',
        gender: '',
    });
    const [showPass, setShowPass] = useState(false);
    const [isOTPStage, setIsOTPStage] = useState(false);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({ ...user, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePhoneNumber(user.phone)) {
            toast.error('Telefon raqami noto‘g‘ri formatda. Iltimos, tekshiring.');
            return;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/logup`,
                user,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            const token = response.headers['x-auth-token'];
            if (response.status === 200) {
                // toast.success('Telefoningizga kod yuborildi.');
                // setIsOTPStage(true); // OTP bosqichiga o‘tadi
                Cookies.set('token', token, { expires: 7 });
                setTimeout(() => navigate('/dashboard'), 2000);
                toast.success('Ro‘yxatdan o‘tish muvaffaqiyatli tugallandi! Yo‘naltirilmoqda...');
                } 
                if(response.status===208)toast.error(response.data.message||"Email or Phone number is already created")
        } catch (err) {
            toast.error(err.response.data || 'Tarmoq xatosi.');
            console.log(err)
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/verify-sms`,
                { phone: user.phone, otp },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            const token = response.headers['x-auth-token'];

            if (response.status === 200 && token) {
                Cookies.set('token', token, { expires: 7 });
                toast.success('Ro‘yxatdan o‘tish muvaffaqiyatli tugallandi! Yo‘naltirilmoqda...');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                toast.error(response.data.message || 'OTP tasdiqlashda xatolik yuz berdi!');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Tarmoq xatosi.');
        }
    };

    return (
        <div className="row w-100 login_page ">
            <ToastContainer />
            <div className="col-6 m-auto d-grid align-items-center FormLogupPage">
                <div className="shadow mx-5 p-3 bg-dark rounded text-light">
                    <h3 className="text-center mb-2 card__title text-warning">
                        {isOTPStage ? 'Tasdiqlash kodini kiriting' : 'Ro‘yxatdan o‘tish'}
                    </h3>
                    {!isOTPStage ? (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="firstName" className="mb-2 signUp">Ism</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="Ismingizni kiriting"
                                            className="p-2 signUp"
                                            value={user.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="lastName" className="mb-2 signUp">Familiya</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Familiyangizni kiriting"
                                            className="p-2 signUp"
                                            value={user.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="email" className="mb-2 signUp">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Emailingizni kiriting"
                                            className="p-2 signUp"
                                            value={user.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="phone" className="mb-2 signUp">Telefon raqam</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="Telefon raqamingizni kiriting"
                                            className="p-2 signUp"
                                            value={user.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="birthday" className="mb-2 signUp">Tug‘ilgan kun</Label>
                                        <Input
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            className="p-2 signUp"
                                            value={user.birthday}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="gender" className="mb-2 signUp">Jinsi</Label>
                                        <Input
                                            id="gender"
                                            name="gender"
                                            type="select"
                                            className="p-2 signUp"
                                            value={user.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Jinsni tanlang</option>
                                            <option value="man">Erkak</option>
                                            <option value="woman">Ayol</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className="col-lg-12">
                                    <FormGroup>
                                        <Label for="password" className="mb-2 signUp">Parol</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPass ? 'text' : 'password'}
                                            placeholder="Parolingizni kiriting"
                                            className="p-2 signUp"
                                            value={user.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </FormGroup>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                            onChange={() => setShowPass(!showPass)}
                                        />
                                        <label className="form-check-label" htmlFor="exampleCheck1">
                                            Parolni ko‘rsatish
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button type="submit" className="btn btn-warning btn-sm">
                                    Yuborish
                                </button>
                                <Link to="/signin">
                                    <button className="btn btn-outline-light  btn-sm">
                                        Sign in
                                    </button>
                                </Link>
                            </div>
                        </Form>
                    ) : (
                        <Form>
                            <FormGroup>
                                <Input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    placeholder="Telefoningizga kelgan kodni kiriting"
                                    className="p-2 signUp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <button
                                    onClick={handleVerifyOtp}
                                    className='btn btn-warning btn-sm'
                                >
                                    Tasdiqlash
                                </button>
                            </div>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
