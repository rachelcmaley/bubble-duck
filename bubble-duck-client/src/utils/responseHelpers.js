import React from 'react';

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
