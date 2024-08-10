import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Include styling as per Figma design

const Login = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Handle Google Login here (OAuth flow)
        // After successful login, redirect to Onebox screen
        navigate('/onebox');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login to ReachInbox</h1>
                <button className="google-login-btn" onClick={handleGoogleLogin}>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
