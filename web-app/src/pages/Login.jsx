import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FooterImage from '../assests/Frame 4.jpg'; // Adjust the path as needed
import LogoImage from '../assests/Logo.png'; // Import the ReachInbox logo

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`;

const Header = styled.header`
  position: absolute;
  top: 20px;
  left: 20px;
  img {
    height: 40px; /* Adjust the height as needed */
  }
`;

const LoginBox = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: auto; 
`;

const Title = styled.h2`
  color: #fff;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 1rem;
  cursor: pointer;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 1rem 0;
  text-align: center;
  img {
    max-width: 100%;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success', response);
    navigate('/onebox');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <LoginContainer>
        <Header>
          <img src={LogoImage} alt="ReachInbox Logo" />
        </Header>
        <LoginBox>
          <Title>Create a new account</Title>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <Button onClick={() => navigate('/signup')}>Create an Account</Button>
          <p style={{ color: '#fff', marginTop: '1rem' }}>
            Already have an account? <span onClick={() => navigate('/signin')} style={{ color: '#4285f4', cursor: 'pointer' }}>Sign In</span>
          </p>
        </LoginBox>
        <Footer>
          <img src={FooterImage} alt="Footer" />
        </Footer>
      </LoginContainer>
    </GoogleOAuthProvider>
  );
};

export default Login;
