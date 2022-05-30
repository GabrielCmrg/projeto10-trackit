import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";
import HabitsContext from "../contexts/HabitsContext";

import Body from "./Body";
import Button from "./Button";
import Description from "./Description";
import Footer from "./Footer";
import HabitCard from "./HabitCard";
import HabitCreationCard from "./HabitCreationCard";
import Header from "./Header";
import Title from "./Title";

export default function HabitsScreen() {
    const { loginInfo } = React.useContext(ApplicationContext);
    const navigate = useNavigate();
    const [isCreatingHabit, setIsCreatingHabit] = React.useState(false);
    const [habits, setHabits] = React.useState([]);
    const [habitName, setHabitName] = React.useState("");
    const [selectedDays, setSelectedDays] = React.useState([]);

    function loadHabits(token) {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config);
        promise
            .then(response => setHabits(response.data))
            .catch(error => console.log(error.response));
    }

    React.useEffect(() => {
        if (loginInfo.token === null) {
            navigate("/");
        } else {
            loadHabits(loginInfo.token);
        }
        
    }, [loginInfo.token, navigate]);

    function makeDescription() {
        if (habits.length === 0) {
            return (
                <Description>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </Description>
            )
        } else {
            return null;
        }
    }

    const contextValue = {
        selectedDays, 
        setSelectedDays, 
        habitName, 
        setHabitName,
        loadHabits,
        setIsCreatingHabit
    };

    const descriptionText = makeDescription();

    return (
        <HabitsContext.Provider value={contextValue}>
            <Body>
                <Header />
                    <Flex>
                        <Title>Meus hábitos</Title>
                        <Button onClick={() => setIsCreatingHabit(true)}>+</Button>
                    </Flex>
                    {isCreatingHabit? <HabitCreationCard />: null}
                    {habits.map(habit => <HabitCard key={habit.id} id={habit.id} name={habit.name} days={habit.days} />)}
                    {descriptionText}
                <Footer />
            </Body>
        </HabitsContext.Provider>
    );
}

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;

    button {
        width: 40px;
        height: 35px;
    }
`;