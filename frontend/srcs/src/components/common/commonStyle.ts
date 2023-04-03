import styled from "styled-components";
import { COLORS } from "../../colors";
import { mediaSize } from "../../mediaSize";

/* -------------------------------------------------------------------------- */
/*                         Style Applied To Whole App                         */
/* -------------------------------------------------------------------------- */
export const AppContainer = styled.div`
  color: ${COLORS.primary};
`;

/* --------------------------------- button --------------------------------- */
export const ButtonNoStyle = styled.button`
  border: none;
  background-color: ${COLORS.background};
`;

/* ---------------------------------- text ---------------------------------- */
export const Heading1 = styled.h1`
  @media (max-width: ${mediaSize.mobile}) {
    font-size: 2.25rem;
    font-weight: bold;
    line-height: 2.5rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 3rem;
    font-weight: bold;
    line-height: 3.75rem;
  }
`;

export const Heading2 = styled.h2`
  @media (max-width: ${mediaSize.mobile}) {
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.25rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: bold;
  }
`;

export const Heading3 = styled.h3`
  @media (max-width: ${mediaSize.mobile}) {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.625rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 2rem;
    line-height: 2.25rem;
    font-weight: bold;
  }
`;

export const Heading4 = styled.h4`
  @media (max-width: ${mediaSize.mobile}) {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.375rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 1.5rem;
    line-height: 1.625rem;
    font-weight: bold;
  }
`;

export const Heading5 = styled.h5`
  @media (max-width: ${mediaSize.mobile}x) {
    font-size: 1.25rem;
    line-height: 1.375rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 1.5rem;
    line-height: 1.625rem;
  }
`;

export const Paragraph = styled.p`
  @media (max-width: ${mediaSize.mobile}) {
    font-size: 0.875rem;
    line-height: 1rem;
  }
  @media (min-width: ${mediaSize.mobile}) {
    font-size: 1.25rem;
    line-height: 1.375rem;
  }
`;
