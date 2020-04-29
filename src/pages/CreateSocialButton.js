import React from "react";
import styled, { css } from "styled-components";
import api from "../services/api";
import axios from "axios";
import * as FontAwesomeIcon from "react-icons/fa";
import { getUser } from "../services/auth";

import Shell from "../components/Shell";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const preDefinedButtons = [
  {
    id: "instagram",
    icon: "FaInstagram",
    color: "#E85453",
    gradient:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
    label: "Instagram",
  },
  {
    id: "youtube",
    label: "Youtube",
    icon: "FaYoutube",
    color: "#FF0000",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "FaFacebookF",
    color: "#4267B2",
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: "FaTwitter",
    color: "#1DA1F2",
  },
  {
    id: "twitch",
    label: "Twitch",
    icon: "FaTwitch",
    color: "#6441A5",
  },
];

function Page({ history, match }) {
  const [formState, setFormState] = React.useState({});
  const [buttonStyle, setButtonStyle] = React.useState(null);

  const handleButtonSelection = (button) => {
    setButtonStyle(button);
    setFormState((state) => ({ ...state, label: button.label }));
  };

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    setFormState((state) => ({ ...state, [field]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!buttonStyle) {
      alert("Selecione um estilo de botão para continuar");
      return;
    }

    const data = {
      ...buttonStyle,
      label: formState.label,
      link: formState.link,
      page_id: match.params.id,
    };

    api.post("social-buttons", data).then((response) => {
      alert("Botão criado com sucesso!");

      history.push(`/pages/${match.params.id}/edit`);
    });
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

          <TextInput
            label="Link do Botão"
            value={formState.link}
            onChange={handleInputChange("link")}
            required
          />

          <SocialButtonCarousel>
            {preDefinedButtons.map((button) => {
              const Icon = FontAwesomeIcon[button.icon];

              return (
                <SocialButton
                  type="button"
                  key={button.id}
                  onClick={() => handleButtonSelection(button)}
                  selected={buttonStyle?.id === button.id}
                >
                  <SocialButtonIconWrapper
                    background={button.gradient || button.color}
                  >
                    {Icon && <Icon />}
                  </SocialButtonIconWrapper>
                  <SocialButtonLabel>{button.label}</SocialButtonLabel>
                </SocialButton>
              );
            })}
          </SocialButtonCarousel>

          <Button>Criar botão</Button>
        </form>
      </Container>
    </Shell>
  );
}

const Container = styled.div``;

const SocialButtonCarousel = styled.div`
  overflow-x: auto;
  display: flex;
  padding: 1em 0.5em;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SocialButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 0;
  font-size: 1em;
  flex: 0 0 5em;
  width: 5em;
  cursor: pointer;
  transition: all 0.14s ease;

  &:hover {
    transform: scale(1.1);
  }

  ${(props) =>
    props.selected &&
    css`
      transform: scale(1.2);
    `}
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

export default Page;
