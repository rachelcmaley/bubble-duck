import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotoUploadResponse } from '../redux/responsesSlice';

export const DebugComponent = () => {
    const dispatch = useDispatch();
    const photoUploadResponse = useSelector((state) => state.responses.photoUploadResponse);

    useEffect(() => {
        // Simulating a photo upload response
        const simulatedResponse = {
            choices: [
                {
                    message: {
                        content: "Simulated response content for debugging purposes."
                    }
                }
            ]
        };

        // Dispatch action to update the Redux store
        dispatch(setPhotoUploadResponse(simulatedResponse));
    }, [dispatch]);

    return (
        <div>
            <h2>Debug Component</h2>
            <p>Photo Upload Response:</p>
            {photoUploadResponse && photoUploadResponse.choices && photoUploadResponse.choices.length > 0 ? (
                <p>{photoUploadResponse.choices[0].message.content}</p>
            ) : (
                <p>No response available.</p>
            )}
        </div>
    );
};
