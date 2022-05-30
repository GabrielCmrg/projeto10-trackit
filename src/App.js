import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import GlobalStyle from "./themes/GlobalStyle";

import ApplicationContext from "./contexts/ApplicationContext";

import HabitsScreen from "./pages/Habits/HabitsScreen";
import HistoryScreen from "./pages/HistoryScreen";
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";
import TodayScreen from "./pages/Today/TodayScreen";

export default function App() {
    const [loginInfo, setLoginInfo] = React.useState({
        image: localStorage.getItem("image"),
        token: localStorage.getItem("token")
    });
    const [tasks, setTasks] = React.useState([]);
    const [tasksDone, setTasksDone] = React.useState(0);

    React.useEffect(() => {
        let count = 0;
        tasks.forEach(task => {
            if (task.done) {
                count++;
            }
        });
        setTasksDone(count);
    }, [tasks]);

    const contextValue = {loginInfo, setLoginInfo, tasks, setTasks, tasksDone, setTasksDone};

    return (
        <ApplicationContext.Provider value={contextValue} >
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/cadastro" element={<SignupScreen />} />
                    <Route path="/habitos" element={<HabitsScreen />} />
                    <Route path="/hoje" element={<TodayScreen />} />
                    <Route path="/historico" element={<HistoryScreen />} />
                </Routes>
            </BrowserRouter>
        </ApplicationContext.Provider>
    );
}
