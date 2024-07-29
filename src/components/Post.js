// src/components/Post.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ post, comments, addComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await addComment(post.id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="mb-4">{post.content}</p>
      <form onSubmit={handleCommentSubmit} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="flex-grow p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Comment</button>
      </form>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (newPost.trim()) {
      const response = await axios.post('http://localhost:5000/posts', { content: newPost });
      setPosts([...posts, response.data]);
      setNewPost('');
    }
  };

  const addComment = async (postId, text) => {
    const response = await axios.post(`http://localhost:5000/posts/${postId}/comments`, { text });
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, response.data] } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <div className="mb-6">
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write a new post"
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={addPost} className="bg-blue-500 text-white p-2 rounded w-full">Add Post</button>
      </div>
      {posts.map((post) => (
        <Post key={post.id} post={post} comments={post.comments} addComment={addComment} />
      ))}
    </div>
  );
};

export default PostPage;
