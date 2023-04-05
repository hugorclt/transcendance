import { createGlobalStyle } from "styled-components";
import { mediaSize, screenSize } from "./mediaSize";
import { COLORS } from "./colors";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-family: "IBM Plex Mono";
}

body {
  padding: 0;
  margin: 0;
  background-color: ${COLORS.background};
}

.popup-overlay {
  background: rgba(0, 0, 0, 0.5);
}

input {
  border: none;
  border-radius: 8px;
  background-color: ${COLORS.darkergrey};
  padding: 8px;
  color: ${COLORS.primary};

}

input::placeholder {
  color: ${COLORS.primary};
}

@media screen and (max-width: ${screenSize.tablet}) {
    h1 {
        font-size: 2.25rem;
        font-weight: bold;
        line-height: 2.5rem;
        color: ${COLORS.primary}
    }

    h2 {
      font-size: 2rem;
      font-weight: bold;
      line-height: 2.25rem;
      color: ${COLORS.primary}

    }

    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.625rem;
      color: ${COLORS.primary}

    }

    h4 {
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.375rem;
      color: ${COLORS.primary}

    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.375rem;
      color: ${COLORS.primary}

    }

    p {
      font-size: 0.875rem;
      line-height: 1rem;
      color: ${COLORS.primary}

    }
}

@media screen and (min-width: ${screenSize.tablet}) {
    h1 {
      font-size: 3rem;
      font-weight: bold;
      line-height: 3.75rem;
      color: ${COLORS.primary}

    }

    h2 {
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-weight: bold;
      color: ${COLORS.primary}

    }

    h3 {
      font-size: 2rem;
      line-height: 2.25rem;
      font-weight: bold;
      color: ${COLORS.primary}

    }

    h4 {
      font-size: 1.5rem;
      line-height: 1.625rem;
      font-weight: bold;
      color: ${COLORS.primary}

    }

    h5 {
      font-size: 1.5rem;
      line-height: 1.625rem;
      color: ${COLORS.primary}

    }

    p {
      font-size: 1rem;
      line-height: 1.375rem;
      color: ${COLORS.primary}

    }
}

`;
