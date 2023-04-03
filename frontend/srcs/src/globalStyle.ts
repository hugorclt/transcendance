import { createGlobalStyle } from "styled-components";
import { mediaSize, screenSize } from "./mediaSize";
import { COLORS } from "./colors";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  font-family: "IBM Plex Mono";
  color: ${COLORS.primary}
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
}

@media screen and (max-width: ${screenSize.tablet}) {
    h1 {
        font-size: 2.25rem;
        font-weight: bold;
        line-height: 2.5rem;
    }

    h2 {
      font-size: 2rem;
      font-weight: bold;
      line-height: 2.25rem;
    }

    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.625rem;
    }

    h4 {
      font-size: 1.25rem;
      font-weight: bold;
      line-height: 1.375rem;
    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.375rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1rem;
    }
}

@media screen and (min-width: ${screenSize.tablet}) {
    h1 {
      font-size: 3rem;
      font-weight: bold;
      line-height: 3.75rem;
    }

    h2 {
      font-size: 2.25rem;
      line-height: 2.5rem;
      font-weight: bold;
    }

    h3 {
      font-size: 2rem;
      line-height: 2.25rem;
      font-weight: bold;
    }

    h4 {
      font-size: 1.5rem;
      line-height: 1.625rem;
      font-weight: bold;
    }

    h5 {
      font-size: 1.5rem;
      line-height: 1.625rem;
    }

    p {
      font-size: 1.25rem;
      line-height: 1.375rem;
    }
}

`;
