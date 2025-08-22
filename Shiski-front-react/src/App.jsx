import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import MiPerfil from './modules/auth/pages/MiPerfil.jsx';
import Layout from './modules/layouts/Layout';
import Home from './modules/home/pages/HomePage';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import CoursePage from './modules/courses/pages/CoursePage';
import CourseDetailPage from './modules/courses/pages/CourseDetailPage';
import CartPage from './modules/cart/pages/CartPage';
import AboutUsPage from './modules/about-us/pages/AboutUsPage';
import BusinessPage from './modules/business/pages/BusinessPage';
import BlogPage from './modules/blog/pages/BlogPage';
import ContactPage from './modules/contact/pages/ContactPage';
import { CartProvider } from './modules/cart/context/CartContext';
import { AuthProvider } from './modules/auth/hook/useAuth.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>        {/* ✅ AuthProvider envuelve CartProvider */}
        <CartProvider>
          <Routes>
            {/* rutas */}
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
