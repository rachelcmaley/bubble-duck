import React, { useState } from 'react';
import '../styles/components.css';
import { useDispatch } from 'react-redux';
import { setScheduleResponse } from '../redux/responsesSlice';
import { displayResponseContent } from '../utils/responseHelpers';


export const GetSchedule = () => {
    const [schedule, setSchedule] = useState(null);
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const dispatch = useDispatch();
  
    const handleButtonClick = async () => {
      setError(null);
      setButtonClicked(true);
      setIsLoading(true); // Start loading
  
      try {
        const response = await fetch('http://localhost:5000/schedule', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const scheData = await response.json(); 
        setSchedule(scheData);
        dispatch(setScheduleResponse(scheData))
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch schedule. Please try again later.');
      }
      finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className='elementsContainer'>
        {!buttonClicked && (
          <button onClick={handleButtonClick} className='getScheduleButton'>Get Routine Schedule</button>
        )}
        {isLoading && <p>Loading...</p>}
        {/* Conditionally render the schedule or error message */}
        {schedule && (
          <>
            <div className='responseContainer'>
            <h3>Routine Schedule</h3>
            {displayResponseContent(schedule)}
          </div>
          </>
          
        )}
        {error && <p className="error">{error}</p>} {/* Display any error message */}
      </div>
    );
  }
  
  