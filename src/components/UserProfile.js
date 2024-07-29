// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('http://localhost:5000/profile');
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handlePhotoChange = async (e) => {
    const formData = new FormData();
    formData.append('profilePhoto', e.target.files[0]);

    try {
      const response = await axios.put('http://localhost:5000/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        {profile.profilePhotoUrl ? (
          <img
            src={profile.profilePhotoUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500">No Photo</span>
          </div>
        )}
        <input
          type="file"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );
};

export default UserProfile;
