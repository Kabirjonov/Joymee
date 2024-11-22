import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook
const Error = () => {
    const navigate = useNavigate();

    // Bosh sahifaga qaytish uchun funksiyaning ishlashini ta'minlash
    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="bg-dark d-flex justify-content-center align-items-center text-white" style={{ height: '100vh' }}>
            <div className="text-center">
                <h1>404</h1>
                <h2>Bunday sahifa mavjud emas!</h2>
                <button 
                    className="btn btn-warning mt-4" 
                    onClick={goToHome} 
                    style={{ padding: '10px 20px', fontSize: '16px' }}
                >
                    Bosh sahifaga qaytish
                </button>
            </div>
        </div>
    );
};

export default Error;
