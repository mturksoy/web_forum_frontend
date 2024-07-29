// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const selectUser = async (userId) => {
    setSelectedUser(userId);
    try {
      const postsResponse = await axios.get(`http://localhost:5000/admin/users/${userId}/posts`);
      const commentsResponse = await axios.get(`http://localhost:5000/admin/users/${userId}/comments`);
      const photosResponse = await axios.get(`http://localhost:5000/admin/users/${userId}/photos`);

      setPosts(postsResponse.data);
      setComments(commentsResponse.data);
      setPhotos(photosResponse.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      setSelectedUser(null);
      setPosts([]);
      setComments([]);
      setPhotos([]);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li 
            key={user.id} 
            onClick={() => selectUser(user.id)}
            className="cursor-pointer bg-white p-4 rounded shadow-md"
          >
            {user.username}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="mt-8 bg-white p-6 rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4">User Details</h2>
          <h3 className="text-2xl font-semibold mb-2">Posts</h3>
          {posts.map((post) => (
            <div key={post.id} className="border p-2 mb-2">{post.content}</div>
          ))}
          <h3 className="text-2xl font-semibold mb-2">Comments</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="border p-2 mb-2">{comment.text}</div>
          ))}
          <h3 className="text-2xl font-semibold mb-2">Photos</h3>
          {photos.map((photo) => (
            <img key={photo.id} src={photo.url} alt="User upload" className="w-32 h-32 object-cover mb-2" />
          ))}
          <button 
            onClick={() => deleteUser(selectedUser)} 
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
