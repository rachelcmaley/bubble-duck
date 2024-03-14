import React, { useState } from 'react';
import '../styles/components.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoUploadResponse, setRecommendationsResponse } from '../redux/responsesSlice';
import { displayResponseContent } from '../utils/responseHelpers';
import { useNavigate } from 'react-router-dom';

export const PhotoUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const dispatch = useDispatch();
  const photoUploadResponse = useSelector(state => state.responses.photoUploadResponse)
  const navigate = useNavigate();

  // Function to handle the file selection and update the preview and selected file state
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a URL for the file for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const photoData = await response.json();
        dispatch(setPhotoUploadResponse(photoData));
        setPhotoData(photoData); // Save photo data from backend
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed with an error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetRecsClick = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const requestBody = { data: photoUploadResponse };
      const response = await fetch('http://localhost:5000/recommendations', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const recData = await response.json(); 
      dispatch(setRecommendationsResponse(recData));
      navigate('/get-recommendations', { state: { recommendations: recData } });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isLoading && (
      <form onSubmit={handleSubmit} className='formContainer'>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <h1>
          Step 1: Upload a Snapshot!
        </h1>
        <div className='Instructions'> 
          Instructions: Upload a clear photo of your current skincare products with labels visible.
        </div>
        {/* Conditionally render the Select Photo button */}
        {!selectedFile && (
          <div className='elementsContainer'>
            <label htmlFor="fileInput" className="selectPhotoButton">Select Photo</label>
          </div>
        )}
        {/* Display the image preview */}
        {imagePreview && (
          <div className='elementsContainer'>
            <img src={imagePreview} alt="Preview" className='imagePreview' />
          </div>
        )}
        {/* Conditionally render the Submit Photo button */}
        {selectedFile && !photoData && (
          <div className='elementsContainer'>
          <button type="submit" className="uploadButton">Upload Photo</button>
          </div>
        )}
        {/* {responseFromBackend && (
        <div>
          <p>Response: {JSON.stringify(responseFromBackend)}</p>
        </div>
      )} */}
      </form>
      )}
      {isLoading && (
        <div className='loadingContainer'>
          <img src='bubbles-loading.gif' alt='Loading Bubbles Gif'/>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && photoData && (
        <>
          <div className='responseContainer'>
            <h3>Your Current Products:</h3>
            {/* Render the parsed response content */}
            {displayResponseContent(photoData)}
          </div>
          <button onClick={handleGetRecsClick} className="selectPhotoButton" style={{ textDecoration: 'none' }}>Get Recommendations</button>
        </>
      )}
    </div>
  );
}
