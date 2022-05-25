import React from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

export default function TodayScreen() {
    const { loginInfo } = React.useContext(ApplicationContext);

    return(
        <>
            <Header>
                <div className="site-title">TrackIt</div>
                <ProfilePhoto src={loginInfo.image} alt="profile" />
            </Header>
        </>
    );
}

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
`;

const ProfilePhoto = styled.img`
    border-radius: 50%;
    width: 51px;
    height: 51px;
    object-fit: cover;
`;