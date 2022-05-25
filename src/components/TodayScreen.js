import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from "react-router-dom";
import styled from "styled-components";

import 'react-circular-progressbar/dist/styles.css';

import ApplicationContext from "../contexts/ApplicationContext";

export default function TodayScreen() {
    const { loginInfo } = React.useContext(ApplicationContext);

    return(
        <Body>
            <Header>
                <div className="site-title">TrackIt</div>
                <ProfilePhoto src={loginInfo.image} alt="profile" />
            </Header>
            <Footer>
                <Link to="/habitos">
                    Hábitos
                </Link>
                <ProgressBar>
                    <CircularProgressbar value={20} text={"Hoje"} background backgroundPadding={6}/>
                </ProgressBar>
                <Link to="/historico">
                    Histórico
                </Link>
            </Footer>
        </Body>
    );
}

const Body = styled.div`
    background-color: #F2F2F2;
    height: 100vh;
`;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 40px;
    color: white;
    padding: 0 18px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const ProfilePhoto = styled.img`
    border-radius: 50%;
    width: 51px;
    height: 51px;
    object-fit: cover;
`;

const Footer = styled.div`
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