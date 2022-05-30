import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";

import ApplicationContext from "../../contexts/ApplicationContext";
import HabitsContext from "../../contexts/HabitsContext";

import Button from "../../components/Button";
import Day from "./Day";
import Input from "../../components/Input";
import Loader from "../../components/Loader";

export default function HabitCreationCard() {
    const { loadHabits, setIsCreatingHabit, selectedDays, setSelectedDays, habitName, setHabitName } = React.useContext(HabitsContext);
    const [isLoading, setIsLoading] = React.useState(false);
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
                    setHabitName("");
                    setSelectedDays([]);
                    loadHabits(loginInfo.token);
                })
                .catch(error => {
                    setIsLoading(false);
                    alert("Algo deu errado com o servidor\n" + error.response.statusText);
                });
        } else {
            alert("Selecione um dia da semana.");
            setIsLoading(false);
        }
    }

    dayjs.extend(require("dayjs/plugin/localeData"));
    dayjs.locale(require("dayjs/locale/pt-br"));
    const week = dayjs.weekdays();

    return (
        <Form onSubmit={sendToServer}>
            <Input id="habit-name" placeholder="nome do hábito" value={habitName} onChange={e => setHabitName(e.target.value)} disabled={isLoading} required/>
            <Flex>{week.map((day, index) => <Day key={index} index={index} day={day} isLoading={isLoading}/>)}</Flex>
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
    margin-bottom: 30px;

    input {
        color: #666666;
    }
`;