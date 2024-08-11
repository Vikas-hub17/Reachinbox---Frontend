import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assests/Logo.png';

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
  left: 45%;
  img {
    height: 20px;
  }
`;

const LoginBox = styled.div`
  margin:auto;
  background-color: #1a1a1a;
  padding: 3rem;
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
  color: white;
  font-size: 10px;
`;

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login Success', response);
    navigate('/onebox');
  };

  return (
    <GoogleOAuthProvider clientId="901000455878-o6sr7b6hhkteabc7fns483vqt1pplnjf.apps.googleusercontent.com">
      <LoginContainer>
        <Header>
            <img src={logo} alt='reachinbox-logo'></img>
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
          &copy; 2024 All Rights Reserved
        </Footer>
      </LoginContainer>
    </GoogleOAuthProvider>
  );
};

export default Login;
