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

    const { id, name, avatar, description } = formState;
    const { user } = getUser();

    const pageData = { id, name, avatar, description, owners: [user.id] };

    api.post("pages", pageData).then((response) => {
      alert("Página criada com sucesso!");

      history.push(`/pages/${response.data.id}/edit`);
    });
  };

  const fetchInstagramData = () => {
    axios
      .get(`https://www.instagram.com/${formState.id}/?__a=1`)
      .then((response) => {
        const name = response.data.graphql.user.full_name;
        const description = response.data.graphql.user.biography;
        const avatar = response.data.graphql.user.profile_pic_url_hd;

        setFormState((state) => ({ ...state, name, description, avatar }));
      });
  };

  return (
    <Shell>
      <Container>
        <form onSubmit={handleSave}>
          <TextInput
            label="Nome de usuário"
            value={formState.id}
            onChange={handleInputChange("id")}
            required
          />
          <Button type="button" onClick={fetchInstagramData}>
            Pegar dados do instagram
          </Button>

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

        {/* <Header>
            <Avatar src={pageData.avatar} alt="" />
            <Title>{pageData.name}</Title>
            <Description>{pageData.description}</Description>

            <HeaderAtions>
              <HeaderAction onClick={() => handleSave(pageData.id)}>
                <FaEdit color="#333" size={18} /> Editar
              </HeaderAction>
              <HeaderAction onClick={() => openLink(pageData.id)}>
                <FaExternalLinkAlt color="#333" size={18} /> Visualizar
              </HeaderAction>
            </HeaderAtions>
          </Header>

          <SocialButtonCarousel>
            <SocialButton>
              <SocialButtonIconWrapper background="#ccc">
                <FontAwesomeIcon.FaPlus />
              </SocialButtonIconWrapper>
              <SocialButtonLabel>Novo botão</SocialButtonLabel>
            </SocialButton>

            {pageData.socialButtons.map((item) => {
              const Icon = FontAwesomeIcon[item.icon];

              return (
                <SocialButton key={item.id}>
                  <SocialButtonIconWrapper
                    background={item.gradient || item.color}
                  >
                    <Icon />
                  </SocialButtonIconWrapper>
                  <SocialButtonLabel>{item.label}</SocialButtonLabel>
                </SocialButton>
              );
            })}
          </SocialButtonCarousel>

          <InstagramMosaic>
            <AddLinkButton>
              <FontAwesomeIcon.FaPlus />
              Adicionar Link
            </AddLinkButton>

            {pageData.links
              .filter((link) => link.type === "instagram")
              .map((item) => (
                <SquareMosaicButton key={item.id} image={item.thumbnail} />
              ))}
          </InstagramMosaic> */}
      </Container>
    </Shell>
  );
}

const Container = styled.div``;

const AddLinkButton = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  color: #3a3a3a;
  background-color: "#ddd";
  transition: background-color 0.2s;

  svg {
    font-size: 2.5em;
    margin-bottom: 0.3em;
    color: #666;
  }

  &:hover {
    background-color: #ccc;
  }
`;

const Header = styled.header`
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
  width: 16em;
  height: 16em;
`;

const HeaderAction = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1em;
  line-height: 1.618;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  align-items: center;
  padding: 2em 1em;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  height: 56px;
  outline: none;

  &:hover {
    background-color: #eee;
  }

  svg {
    margin-bottom: 0.5em;
  }
`;

const SocialButtonCarousel = styled.div`
  overflow-x: auto;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SocialButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 1em;
  font-size: 1em;
  flex: 0 0 5em;
  width: 8em;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eee;
  }
`;

const SocialButtonIconWrapper = styled.div`
  position: relative;
  border-radius: 9em;
  width: 3.5em;
  height: 3.5em;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.background};

  svg {
    font-size: 1.618em;
    color: white;
  }

  &:after {
    content: "";
    position: absolute;
    height: 50px;
    width: 50px;
    border: 2px solid white;
    border-radius: 9em;
    left: 1px;
    top: 1px;
  }
`;

const SocialButtonLabel = styled.span`
  max-width: 100%;
  display: inline-block;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 0.5em;
`;

const InstagramMosaic = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.2em;
  margin-top: 0.5em;
`;

const SquareMosaicButton = styled.button`
  background: center url(${(props) => props.image}) no-repeat;
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border: none;
  display: block;
  outline: none;
  cursor: pointer;
`;

export default Page;
