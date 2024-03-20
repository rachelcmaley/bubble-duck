import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EditResponseContent } from '../utils/responseHelpers';
import { setRecommendationsResponse } from '../redux/responsesSlice';


export const ConfirmProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector(state => state.responses.photoUploadResponse);
  const photoPreviewUrl = useSelector(state => state.responses.photoPreviewUrl);
  const [isLoading, setIsLoading] = useState(false);
  const initialResponse = useSelector(state => state.responses.photoUploadResponse);
  const quizAnswers = useSelector(state => state.quiz.answers);


  // Function to extract product types from the content
function extractProductTypesFromContent(content) {
    const productTypes = [];
    const lines = content.split('\n');

    // Example patterns to identify product types
    const productTypePatterns = {
        "sunscreen": /sunscreen/i,
        "toner": /toner/i,
        "serum": /serum/i,
        "moisturizer": /moisturizer/i,
        "cleanser": /cleanser/i,
        "exfoliant": /exfoliant/i,
        // Add more mappings as needed
    };

    lines.forEach(line => {
        Object.keys(productTypePatterns).forEach(type => {
            if(productTypePatterns[type].test(line)) {
                // Add to productTypes if not already included
                if(!productTypes.includes(type)) {
                    productTypes.push(type);
                }
            }
        });
    });

    return productTypes;
}

  const handleGetRecsClick = async (event) => {

    if (!productData || Object.keys(productData).length === 0) {
        console.error('No product data available.');
        return;
    }

    setIsLoading(true);
    const content = productData.choices[0].message.content;
    const requestBody = {
        productTypes: extractProductTypesFromContent(content),
        preferences: quizAnswers
    };
    console.log(requestBody)

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
      console.log(recData)

      // Update Redux store and navigate to the recommendations page with the data
      dispatch(setRecommendationsResponse(recData.recommendations));
      navigate('/get-recommendations');
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
                <h3>My Products</h3>
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
