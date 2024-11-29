import React from 'react';
import { Navigate } from 'react-router-dom'; // Navigate komponenti import qilish

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // JWT tokenni olish

    // Agar token mavjud bo'lmasa, signin sahifasiga yo'naltirish
    if (!token) {
        return <Navigate to="/signin" replace />; // `Navigate` komponentidan foydalanish
    }

    // Agar token mavjud bo'lsa, children komponentini ko'rsatish
    return children;
};

export default ProtectedRoute;
