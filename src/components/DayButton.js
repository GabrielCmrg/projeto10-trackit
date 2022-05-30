import styled from "styled-components";

const DayButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #CFCFCF;
    font-size: 20px;
    color: ${props => props.color};
    background-color: ${props => props.bgcolor};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px;
    cursor: pointer;
`;

export default DayButton;