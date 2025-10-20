import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
    min-height: 100%;
    margin: 0;
    min-width: 320px;
    padding: ${({ theme }) => theme.space[3]}px;
    text-align: center;
    scrollbar-gutter: stable;

    @media (min-width: ${({ theme }) => theme.mediaQueries.mobile}) {
      padding: ${({ theme }) => theme.space[5]}px;
  }
}

:root {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};

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
  color: inherit;
  text-decoration: none;
}

input[type="checkbox"] {
  vertical-align: middle;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

img {
  width: 100%;
  object-fit: cover;
}
`;

export default GlobalStyle;
