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
  const [formState, setFormState] = React.useState({ id: "forbesbr" });
  const [pageData, setPageData] = React.useState(null);

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((state) => ({ ...state, [field]: value }));
  };

  const handleSave = () => {
    const { user } = getUser();

    const data = { ...pageData, id: formState.id, owners: [user.id] };

    api.post("pages", data).then((response) => {
      if (response.status < 400) {
        alert("Página criada com sucesso!");

        history.push(`/p/pages/${response.data.id}/edit`);
      } else {
        alert("Ocorreu um erro, tente novamente");
      }
    });
  };

  const fetchInstagramData = (event) => {
    event.preventDefault();
    axios
      .get(`https://www.instagram.com/${formState.id}/?__a=1`)
      .then((response) => {
        const name = response.data.graphql.user.full_name;
        const description = response.data.graphql.user.biography;
        const avatar = response.data.graphql.user.profile_pic_url_hd;

        setPageData({ name, description, avatar });
      })
      .catch(() => {
        alert("Instagram não encontrado");
      });
  };

  return (
    <Shell>
      <Container>
        <form onSubmit={fetchInstagramData}>
          <TextInput
            label="Nome de usuário"
            value={formState.id}
            onChange={handleInputChange("id")}
            required
          />
          <Button>Pesquisar instagram</Button>
        </form>

        {pageData && (
          <>
            <InstagramHeader>
              <Avatar src={pageData.avatar} alt="" />
              <Title>{pageData.name}</Title>
              <Description>{pageData.description}</Description>
            </InstagramHeader>

            <Button onClick={handleSave}>Criar página</Button>
          </>
        )}
      </Container>
    </Shell>
  );
}

const Container = styled.div``;

const InstagramHeader = styled.header`
  display: grid;
  grid-template-columns: 5em auto;
  grid-template-rows: 1.35em auto;
  grid-template-areas: "avatar title actions" "avatar description actions";
  grid-gap: 0 1em;
  padding: 1em 0;
`;

const Avatar = styled.img`
  grid-area: avatar;
  width: 100%;
  border-radius: 9em;
  margin: auto;
`;

const Title = styled.h1`
  grid-area: title;
  margin: 0;
  font-size: 1em;
`;

const Description = styled.p`
  grid-area: description;
  font-size: 0.9em;
  margin: 0;
`;

export default Page;
