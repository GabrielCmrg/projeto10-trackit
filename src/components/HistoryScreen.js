import styled from "styled-components";

import Body from "./Body";
import Description from "./Description";
import Footer from "./Footer";
import Header from "./Header";
import Title from "./Title";

export default function HistoryScreen() {
    return(
        <Body>
            <Header />
            <Title>Histórico</Title>
            <Sep></Sep>
            <Description>Em breve você poderá ver o histórico dos seus hábitos aqui!</Description>
            <Footer />
        </Body>
    );
}

const Sep = styled.div`
    height: 12px;
`;