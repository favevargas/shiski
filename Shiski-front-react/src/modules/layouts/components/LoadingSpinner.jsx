import React from 'react';
import '../styles/LoadingSpinner.css'; 

export default function LoadingSpinner({
    message = 'Cargando...',
    showProgress = false,
    progress = 0,
    size = 'medium',
    overlay = false 
}) {
    const sizeClass = {
        small: 'spinner-sm',
        medium: 'spinner-md',
        large: 'spinner-lg'
    };

    const content = (
        <div className={'loading-spinner ' + sizeClass[size]}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{message}</span>
            </div>
            <div className="loading-message">
            <p className="mb-1">{message}</p>
            {showProgress && (
                <div className="progress mt-2">
                    <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" 
                    style={{ width: `${progress}%` }} 
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                        {progress}%
                    </div>
                </div>
            )} 
            <small className="text-muted">Por favor, espera... Esto puede tardar hasta 50 segundos...</small>
        </div>
    </div>
    );

    if (overlay) {
        return (
            <div className="loading-overlay">
            <div className="loading-overlay-content">
                {content}
            </div>
            </div>
        );
    }
    return content;
}
