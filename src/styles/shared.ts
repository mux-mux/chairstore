import { css } from 'styled-components';

export const overlayStyles = css`
  position: fixed;
  top: 0;
  height: 100vh;
  @supports (height: max(100%, 100vh)) {
    height: max(100%, 100vh);
  }
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  isolation: isolate;
  z-index: 100;
`;
