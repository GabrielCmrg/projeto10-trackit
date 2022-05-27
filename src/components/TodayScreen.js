import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

import ApplicationContext from "../contexts/ApplicationContext";
import Body from "./Body";
import Description from "./Description";
import Footer from "./Footer";
import Header from "./Header";
import Title from "./Title";

import "dayjs/locale/pt-br";

export default function TodayScreen() {
    const { loginInfo, tasks, setTasks, tasksDone } = React.useContext(ApplicationContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loginInfo.token === null) {
            navigate("/");
        } else {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
            const config = {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }

            const promise = axios.get(URL, config);
            promise
                .then(response => setTasks(response.data))
                .catch(error => console.log(error.response));
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function formPhrase() {
        if (tasks.length === 0 || tasksDone / tasks.length === 0) {
            return ["Nenhum hábito concluído ainda", "#BABABA"];
        } else {
            const percentage = tasksDone / tasks.length;
            return [`${percentage.toFixed()}% dos hábitos concluídos`, "#8FC549"];
        }
    }

    const now = dayjs().locale("pt-br");
    const date = now.format("dddd, DD/MM");
    const dateString = date.charAt(0).toUpperCase() + date.slice(1);

    const [description, color] = formPhrase();

    return(
        <Body>
            <Header />
            <Title>{dateString}</Title>
            <Description color={color}>{description}</Description>
            {tasks}
            <Footer />
        </Body>
    );
}