import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPhotoUploadResponse } from '../redux/responsesSlice';
import { FaEdit, FaCheck } from 'react-icons/fa';
import '../styles/components.css';

export const parseRoutines = (content) => {
   // Split content into lines
   const lines = content.split(/\n\n?/);

   // Find the index of lines starting the morning and nighttime routines
   const morningRoutineStartIndex = lines.findIndex(line => line.startsWith('Morning'));
   const nighttimeRoutineStartIndex = lines.findIndex(line => line.startsWith('Nighttime'), morningRoutineStartIndex + 1);
 
   // Extract the lines for the morning routine, starting from the first numbered item
   let morningRoutineLines = morningRoutineStartIndex !== -1 ? lines.slice(morningRoutineStartIndex + 1, nighttimeRoutineStartIndex) : [];
   morningRoutineLines = morningRoutineLines.filter(line => line.match(/^\d+\./)); // Keep only numbered lines
 
   // Extract the lines for the nighttime routine, starting from the first numbered item
   let nighttimeRoutineLines = nighttimeRoutineStartIndex !== -1 ? lines.slice(nighttimeRoutineStartIndex + 1) : [];
   nighttimeRoutineLines = nighttimeRoutineLines.filter(line => line.match(/^\d+\./)); // Keep only numbered lines
 
   // Join the lines back into string representation for each routine
   const morningRoutine = morningRoutineLines.join('\n');
   const nighttimeRoutine = nighttimeRoutineLines.join('\n');
 
   return { morningRoutine, nighttimeRoutine };
};


export function displayResponseContent(responseData) {
  if (responseData && responseData.choices && responseData.choices.length > 0) {
    const content = responseData.choices[0].message.content;

    // Determine the separator used in the content ('\n\n' or '\n')
    const separator = content.includes('\n\n') ? '\n\n' : '\n';

    // Adjust regex based on the separator
    const regex = separator === '\n\n' ? /(?:\n\n|^)(\d+\..+?)(?=\n\n|$)/gs : /(?:\n|^)(\d+\..+?)(?=\n|$)/gs;

    // Split content based on the detected separator
    const paragraphs = content.split(separator);

    const items = paragraphs.map((paragraph, index) => {
      if (regex.test(paragraph)) {
        // Reset the regex's lastIndex property to ensure subsequent tests start from the beginning of the string
        regex.lastIndex = 0;
        return <li key={index}>{paragraph}</li>;
      } else {
        return <p key={index}>{paragraph}</p>;
      }
    });

    return <div>{items}</div>;
  }
  return <p>No response content available.</p>;
}


export const parseProductDetails = (content) => {
  const productDetails = [];
  // Split the content by double newlines to work with each product separately.
  const productLines = content.split('\n\n');

  productLines.forEach(line => {
    // Match the product line format: Number. Brand and Product Name - Product Type - Description.
    const match = line.match(/^(\d+)\.\s(.*?):\s(.*?)\s-\s(.*)$/);
    if (match) {
      const [_, number, productWithBrand, productType, description] = match;
      // Split the brand from the product name. This is simplistic and assumes the brand is the first word.
      const [brand, ...nameParts] = productWithBrand.split(' ');
      const name = nameParts.join(' ');
      productDetails.push({
        number, // Keeping number if needed for ordering or reference
        brand,
        name,
        productType,
        description
      });
    }
  });

  return productDetails;
};



export const EditResponseContent = ({ initialResponse }) => {
  const dispatch = useDispatch();
  const initialListItems = initialResponse.choices[0].message.content
    .split('\n\n')
    .map(item => item.trim())
    .filter(item => /^\d+\./.test(item))
    .map(item => {
      const [number, text] = item.split(/\s(.+)/);
      return { number, text, isEditing: false };
    });

  const [listItems, setListItems] = useState(initialListItems);

  const toggleEdit = (index) => {
    const updatedListItems = listItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, isEditing: !item.isEditing };
      }
      return item;
    });
    setListItems(updatedListItems);
  };

  const handleContentChange = (index, newText) => {
    const updatedListItems = listItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, text: newText };
      }
      return item;
    });
    setListItems(updatedListItems);
  };

  const handleSubmit = (index) => {
    toggleEdit(index);
    const updatedContent = listItems.map(item => `${item.number} ${item.text}`).join('\n\n');
    const updatedResponse = { ...initialResponse, choices: [{ ...initialResponse.choices[0], message: { content: updatedContent } }] };
    dispatch(setPhotoUploadResponse(updatedResponse));
    console.log(updatedResponse)
  };

  return (
    <div>
      {listItems.map((item, index) => (
        <div key={index} className="editableListItem">
          <span className="listItemNumber">{item.number}</span>
          <div className="textContainer">
            {item.isEditing ? (
              <textarea
                value={item.text}
                onChange={(e) => handleContentChange(index, e.target.value)}
                rows={3}
                className="editableTextarea"
                id='editableTextarea'
              />
            ) : (
              <span>{item.text}</span>
            )}
          </div>
          {item.isEditing ? (
            <FaCheck onClick={() => handleSubmit(index)} className="faCheck" />
          ) : (
            <FaEdit onClick={() => toggleEdit(index)} className="faEdit" />
          )}
        </div>
      ))}
    </div>
  );
};