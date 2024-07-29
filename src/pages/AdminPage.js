// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setError('You are not authorized to view this page');
        } else {
          setError('Error fetching users');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  const selectUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:5000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedUser(response.data);
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== userId));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ul className="bg-white p-6 rounded shadow-md overflow-auto max-h-96">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => selectUser(user.id)}
              className="cursor-pointer p-2 border-b hover:bg-gray-200"
            >
              {user.username}
            </li>
          ))}
        </ul>
        {selectedUser && (
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">User Details</h2>
            <p>Username: {selectedUser.user.username}</p>
            <h3 className="text-xl mt-4">Posts</h3>
            {selectedUser.posts.map((post) => (
              <div key={post.id} className="border p-2 my-2">
                {post.content}
              </div>
            ))}
            <h3 className="text-xl mt-4">Comments</h3>
            {selectedUser.comments.map((comment) => (
              <div key={comment.id} className="border p-2 my-2">
                {comment.text}
              </div>
            ))}
            <h3 className="text-xl mt-4">Photos</h3>
            {selectedUser.photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt="User's upload" className="w-full my-2 rounded" />
            ))}
            <button
              onClick={() => deleteUser(selectedUser.user.id)}
              className="bg-red-500 text-white p-2 rounded mt-4"
            >
              Delete User
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
