import React from 'react';
import Header from '../common/header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import for Routes and Route
import Home from '../home/Home';
import About from '../about/About';
import Services from '../service/Service';
import Blog from '../blog/Blog';
import Contact from '../contact/Contact';
import LogIn from '../register/LogIn/LogIn';
import LogUp from '../register/LogUp/LogUp';
import ProtectedRoute from '../dashboard/ProtectedRoute'
import Dashboard from '../dashboard/DashboardPage';
import Profile from '../register/Profile/Profile'
import Error from '../ErrorPage/Error';
export default function Pages() {
    return (
        <Router>
            <Header />
            <Routes> {/* Use Routes instead of Switch */}
                <Route path="/" element={<Home />} /> {/* Use element with JSX */}
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<LogIn />} />
                <Route path="/signup" element={<LogUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}
