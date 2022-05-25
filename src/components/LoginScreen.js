import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ApplicationContext from "../contexts/ApplicationContext";
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
        }

        const promise = axios.post(URL, credentials);
        promise
            .then(response => {
                setLoginInfo(response.data);
                navigate("/hoje");
                setIsLoading(false);
            })
            .catch(error => {
                alert("algo deu errado no login\n" + error.response.statusText);
                setIsLoading(false);
            });
    }

    return (
        <Container>
            <LogoImage />
            <Form onSubmit={login}>
                <Input type="email" id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} required/>
                <Input type="password" id="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} required/>
                <Button type="submit" disabled={isLoading}>{isLoading? <Loader />: "Entrar"}</Button>
            </Form>
            <Link to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 68px 36px;

    a {
        color: #52B6FF;
        font-size: 14px;
        cursor: pointer;
    }
`;

const Form = styled.form`
    max-width: 300px;
    width: 100%;
    margin: 25px;
`

const Input = styled.input`
    width: 100%;
    height: 45px;
    border: 1px solid #D4D4D4;
    padding: 10px;
    border-radius: 5px;
    font-size: 20px;
    box-sizing: border-box;
    margin: 3px;

    ::placeholder {
        color: #DBDBDB;
        opacity: 1;
    }

    :disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
        opacity: 1;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    font-size: 26px;
    color: white;
    font-family: inherit;
    border: none;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    :disabled {
        opacity: 0.7;
    }
`;