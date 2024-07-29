// src/pages/HoemPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      login(response.data.access_token, response.data.role);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        <div className="mt-4 text-center">
          <span>Don't have an account? <a href="/register" className="text-blue-500">Register</a></span>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
