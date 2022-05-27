import styled from "styled-components";

const Description = styled.div`
    font-size: 18px;
    color: ${props => props.color};
`;

Description.defaultProps = {
    color: "#666666"
}

export default Description;