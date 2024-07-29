// src/components/GalleryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/gallery');
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">My Photos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white p-4 rounded shadow-md">
            <img src={photo.url} alt="User's uploaded" className="w-full h-48 object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
