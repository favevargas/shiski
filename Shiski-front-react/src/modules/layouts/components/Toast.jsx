import React, { useEffect} from 'react';
import '../styles/Toast.css';

export default function Toast({
    show = false,
    variant = 'info',
    title = '',
    message = '',
    onClose,
    autoClose = true,
    duration = 5000,
    position = 'top-right'
}) {
    useEffect(() => {
        if (show && autoClose) {
            const timer = setTimeout(() => {
                onClose && onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, autoClose, duration, onClose]);

    if (!show) return null; 

    const getIcon = () => {
        switch (variant) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
            default:
                return 'ℹ️';
        }
    };

    return (
        <div className={'toast-container toast-{position}'}>
            <div className={'toast toast-{variant} show'} role="alert">
                <div className="toast-header">
                    <span className="toast-icon">{getIcon()}</span>
                    <strong className="me-auto">{title}</strong>
                    <button 
                    type="button" 
                    className="btn-close" 
                    onClick={onClose} 
                    aria-label="Close">
                    </button>
                    </div>
                </div>          
        </div>
    );
}