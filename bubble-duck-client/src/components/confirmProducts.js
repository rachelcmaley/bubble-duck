import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setPhotoUploadResponse, setRecommendationsResponse } from '../redux/responsesSlice';
import { EditResponseContent } from '../utils/responseHelpers';

export const ConfirmProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
//   const photoPreviewUrl = useSelector(state => state.yourReducer.photoPreviewUrl);
  const [isLoading, setIsLoading] = useState(false);
  const initialProducts = location.state?.photoData; // Assuming photoData is passed via state
  const [editableProducts, setEditableProducts] = useState(initialProducts || []);
//   const initialResponse = location.state?.photoData;

// mock response for testing
const photoPreviewUrl = 'product-photo.jpg'
  const initialResponse = {
    "choices": [
      {
        "finish_reason": "stop",
        "index": 0,
        "message": {
          "content": "In the photo, you can see the following skincare products:\n\n1. La Roche-Posay Anthelios Mineral Tinted Sunscreen for Face SPF 30 - A tinted mineral sunscreen offering broad-spectrum protection.\n\n2. e.l.f. Skin Superfine Toner - This appears to be a facial toner, likely containing Niacinamide given the text on the packaging.\n\n3. Mario Badescu Skincare Glycolic Acid Toner - A gentle exfoliating toner designed for skincare with glycolic acid as an active ingredient.\n\n4. Laneige Cica Sleeping Mask - This is a sleeping mask that contains Centella Asiatica, also known as cica, which is typically used for its soothing and repairing properties.\n\n5. CeraVe Healing Ointment - A skin protectant ointment that contains ceramides and is used to hydrate and restore the skin's barrier. \n\nThese products seem to cover a range of skincare steps including cleansing, toning, treating, moisturizing, and protecting the skin.",
          "role": "assistant"
        }
      }
    ],
    "created": 1709404284,
    "id": "chatcmpl-8yOQmdig5jvM7y2fbdDIEJEqjkE0P",
    "model": "gpt-4-1106-vision-preview",
    "object": "chat.completion",
    "usage": {
      "completion_tokens": 215,
      "prompt_tokens": 780,
      "total_tokens": 995
    }
  };

  const handleGetRecsClick = async (event) => {
    setIsLoading(true);

    // Update Redux store with edited product data
    dispatch(setPhotoUploadResponse(editableProducts));
    const requestBody = { data: editableProducts  };

    try {
        // Send the user's products to the backend for recommendations
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

      // Parse the recommendations from the response
      const recData = await response.json(); 

      // Update Redux store and navigate to the recommendations page with the data
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
    <div className="confirmProductsPage">
      {isLoading ? (
        <div className='loadingContainer'>
          <img src='bubbles-loading.gif' alt='Loading Bubbles Gif'/>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h1>Step 2: Confirm Products</h1>
          <div className='contentContainer'>
            {photoPreviewUrl && (
              <div className='previewContainer'>
                <p className='editInstructions'> 
                  Instructions: Confirm that Bubble Duck AI has correctly identified your products in the photo. Edit if necessary then continue!
                </p>
                <img src={photoPreviewUrl} alt="Uploaded Preview" className='imagePreview'/>
              </div>    
            )}   
            {/* Render EditResponseContent as a component and pass editableProducts as props */}
            {initialResponse && (
              <div className='editResponseContainer'>
                <EditResponseContent initialResponse={initialResponse} /> 
                <button onClick={handleGetRecsClick} className="selectPhotoButton" style={{ textDecoration: 'none' }}>Continue</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );  
};
