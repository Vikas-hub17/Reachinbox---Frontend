// src/components/GoogleLogin.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import './GoogleLogin.css'; // Add styles if needed

const GoogleLoginComponent = ({ onSuccess, onFailure }) => {
  const handleSuccess = (response) => {
    onSuccess(response);
  };

  const handleFailure = (response) => {
    onFailure(response);
  };

  return (
    <div className="google-login">
      <GoogleLogin
        clientId="901000455878-o6sr7b6hhkteabc7fns483vqt1pplnjf.apps.googleusercontent.com" // Replace with your Google Client ID
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
