import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "./Container";
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader";
import LogoImage from "./LogoImage";

export default function SignupScreen() {
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    
    function singup(e) {
        e.preventDefault();
        setIsLoading(true);

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
        const credentials = {
            email,
            name,
            image,
            password
        }

        const promise = axios.post(URL, credentials);
        promise
            .then(() => {
                setIsLoading(false);
                navigate("/");
            })
            .catch(error => {
                alert("algo deu errado no cadastro\n" + error.response.statusText);
                setIsLoading(false);
            });
    }

    return (
        <Container>
            <LogoImage />
            <form onSubmit={singup}>
                <Input type="email" id="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} required/>
                <Input type="password" id="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} required/>
                <Input type="text" id="name" placeholder="nome" value={name} onChange={e => setName(e.target.value)} disabled={isLoading} required/>
                <Input type="url" id="image" placeholder="foto" value={image} onChange={e => setImage(e.target.value)} disabled={isLoading} required/>
                <Button type="submit" disabled={isLoading}>{isLoading? <Loader />: "Cadastrar"}</Button>
            </form>
            <Link to="/">
                Já tem uma conta? Faça login!
            </Link>
        </Container>
    );
}