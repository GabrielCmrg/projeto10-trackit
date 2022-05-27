import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import GlobalStyle from "./themes/GlobalStyle";

import ApplicationContext from "./contexts/ApplicationContext";
import HabitsScreen from "./components/HabitsScreen";
import HistoryScreen from "./components/HistoryScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import TodayScreen from "./components/TodayScreen";

export default function App() {
    const [loginInfo, setLoginInfo] = React.useState({});
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
