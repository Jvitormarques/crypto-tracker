import React, { useReducer, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CryptoContext } from './CryptoContext';

const initialState = {
  symbol: '',
  loading: false,
  data: null,
  error: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  toast: {
    show: false,
    message: '',
    variant: 'success',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SYMBOL':
      return { ...state, symbol: action.payload };
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, { ...action.payload, note: '' }],
        toast: { show: true, message: 'Adicionado aos favoritos!', variant: 'success' },
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
        toast: { show: true, message: 'Removido dos favoritos.', variant: 'danger' },
      };
    case 'UPDATE_NOTE':
      return {
        ...state,
        favorites: state.favorites.map(f =>
          f.id === action.payload.id ? { ...f, note: action.payload.note } : f
        ),
        toast: { show: true, message: 'Nota atualizada.', variant: 'info' },
      };
    case 'SHOW_TOAST':
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload.message,
          variant: action.payload.variant || 'success',
        },
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        toast: { ...state.toast, show: false },
      };
    default:
      return state;
  }
}

export function CryptoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
}

CryptoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
