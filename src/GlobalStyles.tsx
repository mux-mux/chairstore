import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
    min-height: 100%;
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
  overflow-y: scroll;
}

#root {
  position: relative;
  height: 100vh;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: none;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #535bf2;
    }
  }
}

input[type="checkbox"] {
  vertical-align: middle;
}

body {
  margin: 0;
  min-width: 320px;
  padding: 10px;
  text-align: center;
  scrollbar-gutter: stable;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

img {
  width: 100%;
    object-fit: cover;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  @media (hover: hover) and (pointer: fine) {
  a:hover {
    color: #747bff;
  }
}
  button {
    background-color: #f9f9f9;
  }
}
`;

export default GlobalStyles;
