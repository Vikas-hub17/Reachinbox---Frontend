import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.buttonBg};
  border: none;
  color: ${({ theme }) => theme.buttonText};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`;

const ThemeToggle = ({ toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      Toggle Theme
    </ToggleContainer>
  );
};

export default ThemeToggle;
