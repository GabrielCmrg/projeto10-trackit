import { createGlobalStyle } from "styled-components";
import resetCSS from "./resetCSS";

const GlobalStyle = createGlobalStyle`
    ${resetCSS}

    body {
        font-family: 'Lexend Deca', sans-serif;
    }

    .site-title {
        font-family: 'Playball', cursive;
    }
`;

export default GlobalStyle;