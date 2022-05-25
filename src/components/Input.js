import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: 1px solid #D4D4D4;
    padding: 10px;
    border-radius: 5px;
    font-size: 20px;
    box-sizing: border-box;
    margin: 3px;

    ::placeholder {
        color: #DBDBDB;
        opacity: 1;
    }

    :disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
        opacity: 1;
    }
`;

export default Input;