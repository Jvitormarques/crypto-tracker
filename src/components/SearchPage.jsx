import React, { useContext, useEffect } from 'react';
import { CryptoContext } from '../contexts/CryptoContext';
import { useAuth } from '../contexts/AuthContext';
import SearchForm from './SearchForm';
import CryptoList from './CryptoList';
import { Spinner, Alert } from 'react-bootstrap';

export default function SearchPage() {
  const { state, dispatch } = useContext(CryptoContext);
  const { symbol, loading, data, error } = state;
  const { authenticatedFetch, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!symbol || !isAuthenticated) return;
    
    dispatch({ type: 'FETCH_START' });
    
    // Usar o backend em vez da API direta
    authenticatedFetch(`/crypto/search?symbol=${symbol}&vs_currency=usd`)
      .then(res => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then(json => {
        if (json.success) {
          dispatch({ type: 'FETCH_SUCCESS', payload: json.data });
        } else {
          throw new Error(json.error || 'Erro na busca');
        }
      })
      .catch(err => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, [symbol, dispatch, authenticatedFetch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-5">
        <Alert variant="info">
          <h4>Acesso Restrito</h4>
          <p>Você precisa estar logado para buscar criptomoedas.</p>
        </Alert>
      </div>
    );
  }

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
          Nenhuma criptomoeda encontrada para "{symbol}".
        </Alert>
      )}
    </div>
  );
}
