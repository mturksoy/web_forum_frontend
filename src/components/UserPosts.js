// src/components/UserPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">User Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded shadow-md mb-4">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="mb-4">{post.content}</p>
            <Comment postId={post.id} />
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts available</p>
      )}
    </div>
  );
};

export default UserPosts;
