import React, { useContext, useEffect } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import SearchForm from './SearchForm';
import CryptoList from './CryptoList';
import { Spinner, Alert } from 'react-bootstrap';

export default function SearchPage() {
  const { state, dispatch } = useContext(CryptoContext);
  const { symbol, loading, data, error } = state;

  useEffect(() => {
    if (!symbol) return;
    dispatch({ type: 'FETCH_START' });
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}`)
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then(json => dispatch({ type: 'FETCH_SUCCESS', payload: json }))
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, [symbol, dispatch]);

  return (
    <div>
      <h1>Buscar Criptomoedas</h1>
      <SearchForm />

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <div>Carregando...</div>
        </div>
      )}

      {error && <Alert variant="danger" className="my-4">{error}</Alert>}

      {data && data.length > 0 && <CryptoList coins={data} />}

      {data && data.length === 0 && !loading && (
        <Alert variant="warning" className="my-4">
          Nenhuma criptomoeda encontrada para “{symbol}”.
        </Alert>
      )}
    </div>
  );
}
