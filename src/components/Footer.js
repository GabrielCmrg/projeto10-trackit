import { useContext } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from "react-router-dom";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

export default function Footer() {
    const { tasks, tasksDone } = useContext(ApplicationContext);

    return (
        <FooterStyle>
            <Link to="/habitos">
                Hábitos
            </Link>
            <ProgressBar>
                <Link to="/hoje">
                    <CircularProgressbar value={tasksDone} maxValue={tasks.length} text={"Hoje"} background backgroundPadding={6}/>
                </Link>
            </ProgressBar>
            <Link to="/historico">
                Histórico
            </Link>
        </FooterStyle>
    );
}

const FooterStyle = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    box-sizing: border-box;

    a {
        color: #52B6FF;
        font-size: 18px;
        text-decoration: inherit;
    }
`;

const ProgressBar = styled.div`
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 45px);

    .CircularProgressbar-path {
        stroke: white;
    }

    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }

    .CircularProgressbar-text {
        fill: white;
        font-size: 18px;
    }

    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`;