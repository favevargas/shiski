import { useState, useEffect } from 'react';
import CourseList from '../components/CourseList.jsx';


export default function CoursePage() {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    const addToCart = (course) => {
        const updatedCart = [...cartItems, course];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div>
            <h2>Cursos disponibles</h2>
        <CourseList onAddToCart={addToCart}/>
        </div>
    );
}





