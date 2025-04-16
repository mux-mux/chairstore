import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

:root, body, #root {
    height: 100%;
}

:root {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  position: relative;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: none;

  &:hover {
    color: #535bf2;
  }
}

body {
  margin: 0;
  min-width: 320px;
  padding: 10px;
  text-align: center;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`;

export default GlobalStyles;
