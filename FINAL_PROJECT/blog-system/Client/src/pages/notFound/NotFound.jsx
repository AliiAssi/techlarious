// NotFound.js

import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-message">
        Oops! The page you are looking for might be in another castle.
      </p>
      <img
        src="https://img.freepik.com/free-vector/400-error-bad-request-concept-illustration_114360-1933.jpg?size=626&ext=jpg"
        alt="Not Found"
        className="not-found-image"
      />
    </div>
  );
};

export default NotFound;
