import React from "react";
import styled from "styled-components";
import { login } from "../services/auth";
import api from "../services/api";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Link from "../components/Link";

function Page({ history }) {
  const [formState, setFormState] = React.useState({});

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((state) => ({ ...state, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post("sessions", formState)
      .then((response) => {
        if (response.status === 401) {
          alert("Usuário ou senha incorretos, tente novamente");
        } else {
          login(response.data);

          history.push("/");
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro ao fazer login, tente novamente");
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>LinksMoney</Title>
        <TextInput
          label="Email address"
          value={formState.email}
          onChange={handleChange("email")}
          type="email"
          required
        />
        <TextInput
          label="Password"
          value={formState.password}
          onChange={handleChange("password")}
          type="password"
          required
        />
        <Button>Sign in</Button>
        <Link to="">Forgot password?</Link>
        <br />
        <Link to="">Don't have an account? Sign up</Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  padding: 2em 1em;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 1.5em;
  font-weight: 500;
  text-align: center;
`;

export default Page;
