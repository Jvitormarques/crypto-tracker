import React, { useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CryptoContext } from '../contexts/CryptoContext';

export default function ToastNotification() {
  const { state, dispatch } = useContext(CryptoContext);
  const { toast } = state;

  const handleClose = () => {
    dispatch({ type: 'HIDE_TOAST' });
  };

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast bg={toast.variant} onClose={handleClose} show={toast.show} delay={3000} autohide>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">Aviso</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
