import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";
import { DayButton }  from "./Day";

export default function HabitCard({ id, name, days, loadHabits }) {
    dayjs.extend(require("dayjs/plugin/localeData"));
    dayjs.locale(require("dayjs/locale/pt-br"));
    const week = dayjs.weekdays();
    const { loginInfo } = React.useContext(ApplicationContext);

    function deleteHabit() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/" + id;
        const config = {
            headers: {
                Authorization: "Bearer " + loginInfo.token
            }
        }

        const promise = axios.delete(URL, config);
        promise
            .then(() => loadHabits(loginInfo.token))
            .catch(error => console.log(error.response));
    }

    return (
        <Frame>
            <div>{name}</div><ion-icon name="trash-outline" onClick={deleteHabit}></ion-icon>
            <Flex>
                {week.map((day, ind) => {
                    const selected = days.includes(ind);
                    return (<DayButton color={selected? "white": "#CFCFCF"} bgcolor={selected? "#CFCFCF": "white"}>{day[0].toUpperCase()}</DayButton>);
                })}
            </Flex>
        </Frame>
    );
}

const Frame = styled.div`
    background-color: white;
    border-radius: 5px;
    position: relative;
    padding: 15px;
    margin-bottom: 10px;
    color: #666666;
    font-size: 20px;

    div:first-child {
        margin: 0 0 8px 3px;
    }

    ion-icon {
        font-size: 15px;
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

const Flex = styled.div`
    display: flex;
`;