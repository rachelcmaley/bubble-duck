import React, { useState } from 'react';
import '../styles/components.css';
import { displayResponseContent } from '../utils/responseHelpers';
import { useLocation } from 'react-router-dom';

export const GetRecommendations = ({ setRecommendationsShown }) => {
    const [error] = useState(null); 
    const [isLoading] = useState(false);
    const location = useLocation();
    const recommendations = location.state?.recommendations;
  
    return (
      <div className='elementsContainer'>
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