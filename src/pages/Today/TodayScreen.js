import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

import ApplicationContext from "../../contexts/ApplicationContext";

import Body from "../../components/Body";
import Card from "./Card";
import Description from "../../components/Description";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function TodayScreen() {
    const { loginInfo, tasks, setTasks, tasksDone } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    function loadTodayHabits() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const config = {
            headers: {
                Authorization: `Bearer ${loginInfo.token}`
            }
        };

        const promise = axios.get(URL, config);
        promise
            .then(response => setTasks(response.data))
            .catch(error => console.log(error.response));
    }

    React.useEffect(() => {
        if (loginInfo.token === null) {
            navigate("/");
        } else {
            loadTodayHabits();
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formPhrase() {
        if (tasks.length === 0 || tasksDone / tasks.length === 0) {
            return ["Nenhum hábito concluído ainda", "#BABABA"];
        } else {
            const percentage = tasksDone / tasks.length * 100;
            return [`${percentage.toFixed()}% dos hábitos concluídos`, "#8FC549"];
        }
    }

    const now = dayjs().locale(require("dayjs/locale/pt-br"));
    const date = now.format("dddd, DD/MM");
    const dateString = date.charAt(0).toUpperCase() + date.slice(1);

    const [description, color] = formPhrase();

    return(
        <Body>
            <Header />
            <Title>{dateString}</Title>
            <Description color={color}>{description}</Description>
            {tasks.map(task => <Card key={task.id} task={task} loadTodayHabits={loadTodayHabits}/>)}
            <Footer />
        </Body>
    );
}