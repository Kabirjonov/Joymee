import { Navigate } from 'react-router-dom'; // Navigate komponenti import qilish
import Cookies from 'js-cookie'
const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token')
    if (!token) {
        return <Navigate to="/signin" replace />; // `Navigate` komponentidan foydalanish
    }   
    return children 
};

export default ProtectedRoute;
