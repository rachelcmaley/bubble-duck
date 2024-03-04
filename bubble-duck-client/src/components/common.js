import React, { useState } from 'react';
import '../styles/components.css';

export const PhotoUpload = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseFromBackend, setResponseFromBackend] = useState(null);

  // Function to handle the file selection and update the preview and selected file state
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a URL for the file for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFile(file); // Update selected file state
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

      setIsLoading(false);

      if (response.ok) {
        const data = await response.json(); 
        setResponseFromBackend(data); 
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      alert('Upload failed with an error');
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
        <div className='Instructions'> 
          Instructions: Upload a clear photo of your current skincare products with labels visible.
      </div>
        {/* Conditionally render the Select Photo button */}
        {!selectedFile && (
          <div className='elementsContainer'>
            <label htmlFor="fileInput" className="selectPhotoButton">Select Photo</label>
          </div>
        )}
        {/* Conditionally render the Submit Photo button */}
        {selectedFile && (
          <div className='elementsContainer'>
          <button type="submit" className="uploadButton">Upload Photo</button>
          </div>
        )}
        {/* Display the image preview */}
        {imagePreview && (
          <div className='elementsContainer'>
            <img src={imagePreview} alt="Preview" className='imagePreview' />
          </div>
        )}
        {/* {responseFromBackend && (
        <div>
          <p>Response: {JSON.stringify(responseFromBackend)}</p>
        </div>
      )} */}
      </form>
      )}
      {isLoading && <p>Loading...</p>}
      {!isLoading && responseFromBackend && (
        <>
          <div className='responseContainer'>
            <h3>Your Current Products:</h3>
            {/* Render the parsed response content */}
            {displayResponseContent(responseFromBackend)}
          </div>
          <GetRecommendations/>
        </>
      )}
    </div>
  );
}

const displayResponseContent = (responseFromBackend) => {
  if (responseFromBackend && responseFromBackend.choices && responseFromBackend.choices.length > 0) {
    const content = responseFromBackend.choices[0].message.content;
     // Regular expression to match paragraphs that start with a number followed by a period
    const regex = /(?:\n\n|^)(\d+\..+?)(?=\n\n|$)/gs;

    // Split the content by double newlines to get an initial array of paragraphs/items
    const paragraphs = content.split('\n\n');

    // Map over the paragraphs to check and format each one
    const items = paragraphs.map((paragraph, index) => {
      if (regex.test(paragraph)) {
        // If the paragraph matches the regex for a numbered list item, format it as a list item
        return <li key={index}>{paragraph}</li>;
      } else {
        // If it doesn't match the regex, it's treated as a heading or other text
        return <p key={index}>{paragraph}</p>;
      }
    });

    return (
      <div>
        {items}
      </div>
    );
  }
  return <p>No response content available.</p>;
};

export const GetRecommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = async () => {
    setError(null);
    setButtonClicked(true);
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('http://localhost:5000/recommendations', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); 
      setRecommendations(data);
  
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setError('Failed to fetch recommendations. Please try again later.');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='elementsContainer'>
      {!buttonClicked && (
        <button onClick={handleButtonClick} className='getRecsButton'>Get Recommended Products</button>
      )}
      {isLoading && <p>Loading...</p>}
      {/* Conditionally render the recommendations or error message */}
      {recommendations && (
        <>
          <div className='responseContainer'>
          <h3>Recommendations:</h3>
          {displayResponseContent(recommendations)}
        </div>
        </>
        
      )}
      {error && <p className="error">{error}</p>} {/* Display any error message */}
    </div>
  );
}



