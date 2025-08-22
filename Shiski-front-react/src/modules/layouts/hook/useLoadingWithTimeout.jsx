import { useState, useEffect, useRef } from 'react';

export default function useLoadingWithTimeout(timeoutMs = 60000) {
    const [loading, setLoading] = useState(false); // Corregido: era 'Loading'
    const [progress, setProgress] = useState(0);
    const [showTimeout, setShowTimeout] = useState(false); // Corregido: era 'serShowTimeOut'
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const startLoading = () => {
        setLoading(true);
        setProgress(0);
        setShowTimeout(false);

        // Simulación de progreso
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 10; // Incremento aleatorio entre 0 y 10
            });
        }, 2000);

        timeoutRef.current = setTimeout(() => {
            setShowTimeout(true);
        }, 30000); // 30 segundos
    };

    const stopLoading = () => {
        setLoading(false);
        setProgress(100); // Completar al 100% al finalizar
        setShowTimeout(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        // Resetear progreso después de un breve delay
        setTimeout(() => {
            setProgress(0);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return {
        loading,
        progress,
        showTimeout,
        startLoading,
        stopLoading
    };
}



