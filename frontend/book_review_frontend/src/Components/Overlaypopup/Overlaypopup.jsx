import React, { useState, useEffect } from 'react';

const OverlayPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Show the popup only on the first load
  useEffect(() => {
    setShowPopup(true);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full mx-4 relative">
        <h3 className="text-lg text-red-500 font-semibold mb-2">Possible Server Downtime Alert:</h3>
        <p className="mb-4 text-white">
        <span className="text-yellow-500"> Try logging in or registering Once,&nbsp; </span>
          If unable to login/register or view the full project, the server might be temporarily stopped to manage costs.
          Please contact the developer at <span className="text-blue-500">pandeyanant363@gmail.com</span>
        </p>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-300">
          ✕
        </button>
        <button
          onClick={closePopup}
          className="w-full mt-2 bg-red-500 bg-opacity-30 border border-red-500 shadow-md shadow-red-500/50 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:border-yellow-200 hover:text-yellow-200 hover:shadow-yellow-500/50">
          Close
        </button>
      </div>
    </div>
  );
};

export default OverlayPopup;