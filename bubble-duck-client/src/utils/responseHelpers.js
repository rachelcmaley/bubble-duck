import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPhotoUploadResponse } from '../redux/responsesSlice';
import { FaEdit, FaCheck } from 'react-icons/fa';
import '../styles/components.css';

export function displayResponseContent(responseData) {
  if (responseData && responseData.choices && responseData.choices.length > 0) {
    const content = responseData.choices[0].message.content;
    const regex = /(?:\n\n|^)(\d+\..+?)(?=\n\n|$)/gs;
    const paragraphs = content.split('\n\n');
    const items = paragraphs.map((paragraph, index) => {
      if (regex.test(paragraph)) {
        return <li key={index}>{paragraph}</li>;
      } else {
        return <p key={index}>{paragraph}</p>;
      }
    });

    return <div>{items}</div>;
  }
  return <p>No response content available.</p>;
}

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