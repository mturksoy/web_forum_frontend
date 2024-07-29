// src/pages/PostPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../components/Comment';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/posts', { content: newPostContent });
        setPosts([...posts, response.data]);
        setNewPostContent('');
      } catch (error) {
        console.error('Error posting new content:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <form onSubmit={handlePostSubmit} className="mb-8">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Write a new post"
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Post</button>
      </form>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded shadow-md mb-4">
              <h3 className="text-xl font-bold mb-2">{post.content}</h3>
              <Comment postId={post.id} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
