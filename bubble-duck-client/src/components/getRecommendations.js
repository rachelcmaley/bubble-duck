import React, { useState } from 'react';
import '../styles/components.css';
import { displayResponseContent } from '../utils/responseHelpers';
import { useLocation } from 'react-router-dom';

const mockRecs = {
    'id': 'chatcmpl-92gxbdM0b7Z4fypJJNk7zRlzkn3RY', 
    'object': 'chat.completion', 
    'created': 1710428823, 
    'model': 'gpt-4-1106-vision-preview', 
    'usage': {'prompt_tokens': 378, 
        'completion_tokens': 300, 
        'total_tokens': 678}, 
        'choices': [
            {
                'message': {
                    'role': 'assistant', 
                    'content': "Based on the skincare products mentioned, here are some dermatologist-recommended product additions to consider for a more complete skincare routine:\n\n1. **Cleanser**: **Cetaphil Gentle Skin Cleanser** or **Neutrogena Ultra Gentle Hydrating Cleanser**. A gentle cleanser is important for removing dirt, oil, and makeup without stripping the skin of its natural moisture.\n\n2. **Moisturizer**: **CeraVe PM Facial Moisturizing Lotion** or **Aveeno Positively Radiant Daily Moisturizer**. Having a dedicated moisturizer can help maintain skin hydration, especially after using active ingredients like glycolic acid which can be drying. The CeraVe formula is great for nighttime use, while the Aveeno moisturizer can be used during the day.\n\n3. **Retinol Cream**: **SkinCeuticals Retinol 1.0** or **RoC Retinol Correxion Deep Wrinkle Night Cream**. Retinol is a vitamin A derivative that can help with signs of aging, skin texture, and acne. It's important to start with a lower concentration if new to retinol and to use it at night due to increased sun sensitivity.\n\n4. **Antioxidant Serum**: **Skinceuticals C E Ferulic** or **Paula's Choice RESIST Super Antioxidant Concentrate Serum**. Adding an antioxidant serum in the morning can help fight free"
                }, 
                'finish_reason': 'length', 'index': 0
            }
        ]
    }


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