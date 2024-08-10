// src/theme.js
export const lightTheme = {
    body: '#FFF',
    text: '#000',
  };
  
  export const darkTheme = {
    body: '#000',
    text: '#FFF',
  };
  
  // Usage in App.js
  import { ThemeProvider } from 'styled-components';
  import { lightTheme } from './light.css';
  import { darkTheme } from './dark.css';
  
  function App() {
    const [theme, setTheme] = useState('light');
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          {/* Rest of your app */}
        </div>
      </ThemeProvider>
    );
  }
  