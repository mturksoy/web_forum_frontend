import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import GalleryPage from './pages/GalleryPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
