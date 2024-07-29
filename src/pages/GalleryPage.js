// src/pages/GalleryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/photos'); // Kendi fotoğraflarınızı çeken API endpoint'i
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/user/photos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setPhotos([...photos, response.data]);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">My Gallery</h1>
      <form onSubmit={handleFileUpload} className="mb-8">
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Upload Photo</button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="w-full h-48 bg-gray-200 rounded shadow-md overflow-hidden">
              <img src={photo.url} alt="User upload" className="w-full h-full object-cover" />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No photos available</p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
