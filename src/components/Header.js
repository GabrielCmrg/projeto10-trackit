import { useContext } from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

export default function Header() {
    const { loginInfo } = useContext(ApplicationContext);

    return (
        <HeaderStyle>
            <div className="site-title">TrackIt</div>
            <img src={loginInfo.image} alt="profile" />
        </HeaderStyle>
    );
}

const HeaderStyle = styled.div`
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

    img {
        border-radius: 50%;
        width: 51px;
        height: 51px;
        object-fit: cover;
    }
`;