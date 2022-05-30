import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

export default function Card({task, loadTodayHabits}) {
    const { loginInfo } = useContext(ApplicationContext);

    function toggleCheck(done, id) {
        const config = {
            headers: {
                Authorization: "Bearer " + loginInfo.token
            }
        };
        const URL = done? 
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`: 
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;

        const promise = axios.post(URL, null, config);
        promise
            .then(loadTodayHabits)
            .catch(error => console.log(error.response));
    }

    function decideHighlight() {
        const newRecord = task.currentSequence >= task.highestSequence;
        const notNewHabit = task.highestSequence > 0;

        if (newRecord && notNewHabit) {
            return "#8FC549";
        } else {
            return "";
        }
    }

    const currentSequenceComplement = task.currentSequence <= 1? " dia": " dias";
    const highestSequenceComplement = task.highestSequence <= 1? " dia": " dias";
    const highlight = decideHighlight();

    return (
        <Frame>
            <Infos>
                <h3>{task.name}</h3>
                <Counter highlight={task.done? "#8FC549": ""}>
                    <span>Sequência atual: </span>
                    <span>{task.currentSequence + currentSequenceComplement}</span>
                </Counter>
                <Counter highlight={highlight}>
                    <span>Seu recorde: </span>
                    <span>{task.highestSequence + highestSequenceComplement}</span>
                </Counter>
            </Infos>
            <CheckButton bgcolor={task.done? "#8FC549": "#EBEBEB"} onClick={() => toggleCheck(task.done, task.id)}>
                <ion-icon name="checkmark"></ion-icon>
            </CheckButton>
        </Frame>
    );
}

const Frame = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const Infos = styled.div`
    color: #666666;
    
    h3 {
        font-size: 20px;
        margin-bottom: 8px;
    }
`;

const Counter = styled.div`
    font-size: 13px;

    span:last-child {
        color: ${props => props.highlight};
    }
`;

const CheckButton = styled.div`
    background-color: ${props => props.bgcolor};
    border-radius: 5px;
    font-size: 35px;
    width: 69px;
    min-width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;

    ion-icon {
        --ionicon-stroke-width: 64px;
    }
`;