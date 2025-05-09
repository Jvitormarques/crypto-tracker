// src/components/ModalNote.jsx
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { CryptoContext } from '../contexts/CryptoContext';

export default function ModalNote({ show, coin, onHide }) {
  const { dispatch } = useContext(CryptoContext);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (coin) setNote(coin.note || '');
  }, [coin]);

  const handleSave = () => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id: coin.id, note } });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Nota - {coin.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nota Pessoal</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}

ModalNote.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  coin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
  }).isRequired,
};
