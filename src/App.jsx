import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import DashboardPage from './components/DashboardPage';
import ToastNotification from './components/ToastNotification';

function App() {
  return (
    <Router>
      <AppNavbar />
      <ToastNotification />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
