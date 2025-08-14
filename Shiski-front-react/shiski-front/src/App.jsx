import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './modules/layouts/Layout';
import Home from './modules/home/pages/HomePage';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import CoursePage from './modules/courses/pages/CoursePage';
import CartPage from './modules/cart/pages/CartPage';


function App() {

  return (
   <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
