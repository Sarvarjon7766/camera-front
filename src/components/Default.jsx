import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";

const Default = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
        <p className="text-gray-600">
          Siz hali biror rol bilan bog'lanmagan yoki noto‘g‘ri yo‘l tanlandingiz.
        </p>
      </div>
    </div>
  );
};

export default Default;
