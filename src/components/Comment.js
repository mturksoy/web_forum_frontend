// src/components/Comment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/posts/${postId}/comments`, { text: newComment });
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <ul className="space-y-2 mb-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-2 rounded">
            {comment.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="flex-grow p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Comment;
