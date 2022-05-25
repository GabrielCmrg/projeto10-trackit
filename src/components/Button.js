import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    font-size: 26px;
    color: white;
    font-family: inherit;
    border: none;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    :disabled {
        opacity: 0.7;
    }
`;

export default Button;