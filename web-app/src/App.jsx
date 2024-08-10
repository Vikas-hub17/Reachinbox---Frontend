import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import Login from './pages/Login';
import Onebox from './pages/Onebox';
import Reply from './pages/Reply';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Router>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/onebox" component={Onebox} />
            <Route path="/reply" component={Reply} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
