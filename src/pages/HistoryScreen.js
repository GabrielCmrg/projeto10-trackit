import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { Calendar } from "react-calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";

import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Title from "../components/Title";

import 'react-calendar/dist/Calendar.css';

export default function HistoryScreen() {
    const { loginInfo } = React.useContext(ApplicationContext);
    const [incompleteDays, setIncompleteDays] = React.useState([]);
    const [completeDays, setCompleteDays] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loginInfo.token === null) {
            navigate("/");
        } else {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
            const config = {
                headers: {
                    Authorization: "Bearer " + loginInfo.token
                }
            };

            const promise = axios.get(URL, config);
            promise
                .then(response => {
                    const newIncompleteDays = [];
                    const newCompleteDays = [];
                    response.data.forEach(day => {
                        let hasHabitUndone = false;
                        day.habits.forEach(habit => {
                            if (!habit.done) {
                                hasHabitUndone = true;
                            }
                        });
                        if (hasHabitUndone) {
                            newIncompleteDays.push(day.day);
                        } else {
                            newCompleteDays.push(day.day);
                        }
                    });
                    setIncompleteDays(newIncompleteDays);
                    setCompleteDays(newCompleteDays);
                })
                .catch(error => console.log(error.response));
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginInfo.token, navigate]);

    function addClass({ date, view }) {
        if (view === "month") {
            const today = dayjs().isSame(dayjs(date), "day");
            if (completeDays.includes(dayjs(date).format("DD/MM/YYYY")) && !today) {
                return "complete tile";
            }

            if (incompleteDays.includes(dayjs(date).format("DD/MM/YYYY")) && !today) {
                return "incomplete tile";
            }

            return "tile";
        }
    }

    return(
        <Body>
            <Header />
            <Title>Histórico</Title>
            <Sep></Sep>
            <Container>
                <Calendar className="calendar" calendarType="US" tileClassName={addClass}/>
            </Container>
            <Footer />
        </Body>
    );
}

const Sep = styled.div`
    height: 12px;
`;

const Container = styled.div`
    .calendar {
        border: none;
        border-radius: 10px;
    }

    .tile {
        aspect-ratio: 1;
    }

    .incomplete {
        background-color: #EA5766;
        border-radius: 50%;
    }

    .complete {
        background-color: #8CC654;
        border-radius: 50%;
    }
`;