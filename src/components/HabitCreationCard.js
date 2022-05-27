import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";
import Button from "./Button";
import Day from "./Day";
import Input from "./Input";
import Loader from "./Loader";

export default function HabitCreationCard({ loadHabits, setIsCreatingHabit }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [habitName, setHabitName] = React.useState("");
    const [selectedDays, setSelectedDays] = React.useState([]);
    const { loginInfo } = React.useContext(ApplicationContext);

    function sendToServer(e) {
        e.preventDefault();
        setIsLoading(true);

        if (selectedDays.length !== 0){
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
            const obj = {
                name: habitName,
                days: selectedDays
            };
            const config = {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }
            
            const promise = axios.post(URL, obj, config);
            promise
                .then(() => {
                    setIsLoading(false);
                    setIsCreatingHabit(false);
                    loadHabits(loginInfo.token);
                })
                .catch(error => console.log(error.response));
        } else {
            alert("Selecione um dia da semana.");
        }
    }

    dayjs.extend(require("dayjs/plugin/localeData"));
    dayjs.locale(require("dayjs/locale/pt-br"));
    const week = dayjs.weekdays();

    return (
        <Form onSubmit={sendToServer}>
            <Input id="habit-name" placeholder="nome do hábito" value={habitName} onChange={e => setHabitName(e.target.value)} disabled={isLoading} required/>
            <Flex>{week.map((day, index) => <Day key={index} index={index} day={day} selectedDays={selectedDays} setSelectedDays={setSelectedDays} isLoading={isLoading}/>)}</Flex>
            <FlexEnd>
                <span onClick={() => setIsCreatingHabit(false)}>Cancelar</span>
                <Button type="submit" disabled={isLoading}>{isLoading? <Loader />: "Salvar"}</Button>
            </FlexEnd>
        </Form>
    );
}

const Flex = styled.div`
    display: flex;
    margin-bottom: 26px;
`;

const FlexEnd = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
        color: #52B6FF;
        font-size: 16px;
        cursor: pointer;
        margin-right: 20px;
    }

    button {
        font-size: 16px;
        width: 84px;
        height: 35px;
    }
`;

const Form = styled.form`
    background-color: white;
    border-radius: 5px;
    padding: 18px;

    input {
        color: #666666;
    }
`