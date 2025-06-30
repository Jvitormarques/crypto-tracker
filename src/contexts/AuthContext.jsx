import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Estado inicial
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Reducer para gerenciar o estado de autenticação
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// Provider do contexto de autenticação
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // URL base da API
  const API_BASE_URL = 'http://localhost:3001/api';

  // Verificar token salvo no localStorage ao carregar
  useEffect(() => {
    const token = localStorage.getItem('crypto_tracker_token');
    const user = localStorage.getItem('crypto_tracker_user');

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token,
            user: parsedUser
          }
        });
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('crypto_tracker_token');
        localStorage.removeItem('crypto_tracker_user');
      }
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Função de login
  const login = async (username, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no login');
      }

      // Salvar no localStorage
      localStorage.setItem('crypto_tracker_token', data.token);
      localStorage.setItem('crypto_tracker_user', JSON.stringify(data.user));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: data.token,
          user: data.user
        }
      });

      return { success: true, data };
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message
      });
      return { success: false, error: error.message };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      if (state.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      // Limpar localStorage
      localStorage.removeItem('crypto_tracker_token');
      localStorage.removeItem('crypto_tracker_user');
      
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Função para fazer requisições autenticadas
  const authenticatedFetch = async (url, options = {}) => {
    if (!state.token) {
      throw new Error('Usuário não autenticado');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.token}`,
      ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Token expirado ou inválido
      logout();
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    return response;
  };

  // Limpar erro
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    logout,
    authenticatedFetch,
    clearError,
    API_BASE_URL
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export { AuthContext };

