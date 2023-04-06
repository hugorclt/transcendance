import styled from "styled-components";
import { COLORS } from "../../colors";
import { screenSize } from "../../mediaSize";

export const MainLayoutContainer = styled.div`
  height: 100vh;
  min-height: 600px;
  width: 100%;
  display: flex;
  @media (max-width: ${screenSize.laptop}) {
    flex-direction: column;
  }
  @media (min-width: ${screenSize.laptop}) {
    overflow-x: hidden;
  }
`;

export const MainContainer = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.div`
  background-color: ${COLORS.darkergrey};
  flex-grow: 1;
  padding: 16px;
  width: 90%;
  min-width: 280px;
  @media (max-width: ${screenSize.laptop}) {
    width: auto;
  }
`;

export const NavBarContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  @media (max-width: ${screenSize.laptop}) {
    height: 60px;
  }
  @media (min-width: ${screenSize.laptop}) {
    height: 112px;
  }
  display: flex;
  justify-content: space-between;
`;
