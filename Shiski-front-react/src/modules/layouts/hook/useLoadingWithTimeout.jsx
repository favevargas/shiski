import { useState, useEffect, useRef } from 'react';

export default function useLoadingWithTimeout(timeoutMs = 60000) {
    const [Loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showTimeOut, serShowTimeOut] = useState(false);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const startLoading = () => {
        setLoading(true);
        setProgress(0);
        serShowTimeOut(false);

        //simulación de progreso
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev; // Evita que el progreso supere el 90%
                return prev + Math.random() * 10; // Incremento aleatorio entre 0 y 10

            });
        }, 2000);

        timeoutRef.current = setTimeout(() => {
            serShowTimeOut(true);
        }, 30000); // 30 segundos
    };

    const stopLoading = () => {
        setLoading(false);
        setProgress(0);
        serShowTimeOut(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
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
        showTimeOut,
        startLoading,   
        stopLoading
    };
}



