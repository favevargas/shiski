
export default function AlertBox({ show = false, variant = 'success', message = '', onClose }) {
  if (!show) return null;

  
  const customSuccess = variant === 'success';

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show`}
      role="alert"
      style={customSuccess ? {
        backgroundColor: '#255625',
        color: '#fff',
        border: '1px solid #214A21',
        fontWeight: 500
      } : {}}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      />
    </div>
  );
}