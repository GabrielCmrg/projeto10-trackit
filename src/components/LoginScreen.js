import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import ApplicationContext from "../contexts/ApplicationContext";
import Container from "./Container";
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader";
import LogoImage from "./LogoImage";

export default function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const { setLoginInfo } = React.useContext(ApplicationContext);

    function login(e) {
        e.preventDefault();
        setIsLoading(true);

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
        const credentials = {
            email,
            password
        };

        const promise = axios.post(URL, credentials);
        promise
            .then(response => {
                const { image, token } = response.data;
                setLoginInfo({ image, token });
                localStorage.setItem("image", image);
                localStorage.setItem("token", token);
                setIsLoading(false);
                navigate("/hoje");
            })
            .catch(error => {
                alert("algo deu errado no login\n" + error.response.statusText);
                setIsLoading(false);
            });
    }

    return (
        <Container>
            <LogoImage />
            <form onSubmit={login}>
                <Input type="email" id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} required/>
                <Input type="password" id="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} required/>
                <Button type="submit" disabled={isLoading}>{isLoading? <Loader />: "Entrar"}</Button>
            </form>
            <Link to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </Link>
        </Container>
    );
}