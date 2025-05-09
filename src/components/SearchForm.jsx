import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { CryptoContext } from '../contexts/CryptoContext';

export default function SearchForm() {
  const [input, setInput] = useState('');
  const [localError, setLocalError] = useState('');
  const { dispatch } = useContext(CryptoContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) {
      setLocalError('O campo é obrigatório');
      return;
    }
    setLocalError('');
    dispatch({ type: 'SET_SYMBOL', payload: input.toLowerCase().trim() });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      {localError && <Alert variant="danger">{localError}</Alert>}
      <Form.Group>
        <Form.Label>Símbolo da Criptomoeda</Form.Label>
        <Form.Control
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="ex: bitcoin"
        />
      </Form.Group>
      <Button type="submit" className="mt-2">Buscar</Button>
    </Form>
  );
}
