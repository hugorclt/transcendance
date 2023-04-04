import styled from "styled-components";
import { COLORS } from "../../colors";
import { screenSize } from "../../mediaSize";

export const MainLayoutContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  @media (max-width: ${screenSize.laptop}) {
    flex-direction: column;
  }
`;

export const SideBarContainer = styled.div`
  background-color: #19191a;
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
  @media (max-width: ${screenSize.laptop}) {
    width: 100%;
  }
`;

export const NavBarContainer = styled.div`
  width: 100%;
  height: 112px;
  display: flex;
  justify-content: space-between;
`;
