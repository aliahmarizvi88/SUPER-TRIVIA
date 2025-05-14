import React from 'react';
import Loader from '../components/Loader';
const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center">
        <Loader />
      </div>
    </div>
  );
};
export default LoadingPage;
