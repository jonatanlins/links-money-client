import React from "react";
import styled from "styled-components";
import { login } from "../services/auth";
import api from "../services/api";
import { useFormState } from "react-use-form-state";

import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Link from "../components/Link";

function Page({ history }) {
  const [formState, { text, email, password }] = useFormState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = formState.values;

    api
      .post("users", data)
      .then((response) => {
        if (response.status >= 400) {
          alert(
            "Já existe um cadastro para o email informado, tente fazer login"
          );
        } else {
          login(response.data);

          history.push("/p");
        }
      })
      .catch((error) => {
        alert("Ocorreu um erro ao cadastrar-se, tente novamente");
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Cadastre-se no LinksMoney</Title>

        <TextInput label="Nome" required {...text("name")} />
        <TextInput label="Endereço de email" required {...email("email")} />
        <TextInput label="Senha" required {...password("password")} />

        <Button>Cadastrar-se</Button>

        <Link to="/p/signin">Já tem uma conta? Faça login</Link>
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
