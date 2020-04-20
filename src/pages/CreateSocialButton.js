import React from "react";
import styled from "styled-components";
import api from "../services/api";
import axios from "axios";
import * as FontAwesomeIcon from "react-icons/fa";
import { getUser } from "../services/auth";

import Shell from "../components/Shell";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

function Page({ history }) {
  const [formState, setFormState] = React.useState({});

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((state) => ({ ...state, [field]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    // api.post("pages", pageData).then((response) => {
    //   alert("Botão criado com sucesso!");

    //   history.push(`/pages/${response.data.id}/edit`);
    // });
  };

  return (
    <Shell>
      <Container>
        <form onSubmit={handleSave}>
          <TextInput
            label="Título do Botão"
            value={formState.label}
            onChange={handleInputChange("label")}
            required
          />

          <Avatar src={formState.avatar} />

          <TextInput
            label="Nome da página"
            value={formState.name}
            onChange={handleInputChange("name")}
            required
          />

          <TextInput
            label="Biografia"
            value={formState.description}
            onChange={handleInputChange("description")}
            multiline
            required
          />

          <Button>Criar página</Button>
        </form>
      </Container>
    </Shell>
  );
}

const Container = styled.div``;

const Avatar = styled.img`
  grid-area: avatar;
  width: 100%;
  border-radius: 9em;
  margin: auto;
  width: 16em;
  height: 16em;
`;

export default Page;
