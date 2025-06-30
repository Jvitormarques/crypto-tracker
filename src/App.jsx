import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AppNavbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import ToastNotification from './components/ToastNotification';

// Componente para proteger rotas
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center py-5">Carregando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Componente para redirecionar usuários logados
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="text-center py-5">Carregando...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/" />;
}

function AppContent() {
  return (
    <Router>
      <AppNavbar />
      <ToastNotification />
      <main className="container py-4">
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
