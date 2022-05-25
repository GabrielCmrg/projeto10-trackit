import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./themes/GlobalStyle";
import ResetCSS from "./themes/ResetCSS";

import HabitsScreen from "./components/HabitsScreen";
import HistoryScreen from "./components/HistoryScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import TodayScreen from "./components/TodayScreen";

export default function App() {
    return (
        <>
        <ResetCSS />
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
        </>
    );
}
