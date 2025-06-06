import styled from 'styled-components';
import { COLORS } from '../../constants';

const Spinner = (): React.ReactElement => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

const SpinnerOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${COLORS.borderPrimary};
  border-radius: 50%;
  border-top-color: ${COLORS.bgColorSecondary};
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export default Spinner;
