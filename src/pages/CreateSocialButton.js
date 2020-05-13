import React from "react";
import styled, { css } from "styled-components";
import api from "../services/api";
import axios from "axios";
import * as FontAwesomeIcon from "react-icons/fa";
import { getUser } from "../services/auth";
import { CirclePicker } from "react-color";
import { useFormState } from "react-use-form-state";

import Overlay from "../components/Overlay";
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
  {
    id: "mystore",
    label: "Minha Loja",
    icon: "FaStoreAlt",
    color: "#27ae60",
  },
  {
    id: "mylist",
    label: "Catálogo",
    icon: "FaList",
    color: "#2980b9",
  },
  {
    id: "mypayment",
    label: "Pagamento",
    icon: "FaMoneyBillWaveAlt",
    color: "#8e44ad",
  },
  {
    id: "myapp",
    label: "Aplicativo",
    icon: "FaMobileAlt",
    color: "#e67e22",
  },
];

function Page({ history, match }) {
  const [formState, { text }] = useFormState();

  const handleButtonSelection = (button) => {
    formState.setField("gradient", button.gradient);
    formState.setField("label", button.label);
    formState.setField("icon", button.icon);
    formState.setField("color", button.color);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const { icon, color, label, link, gradient } = formState.values;
    const page_id = match.params.id;

    if (!icon) {
      alert("Selecione um ícone para continuar");
      return;
    }
    if (!color) {
      alert("Selecione uma cor para continuar");
      return;
    }

    const data = { icon, color, label, link, gradient, page_id };

    api.post("social-buttons", data).then((response) => {
      alert("Link criado com sucesso!");

      history.push(`/p/pages/${match.params.id}/edit`);
    });
  };

  const SelectedIcon = FontAwesomeIcon?.[formState.values.icon];

  return (
    <Overlay>
      <Container>
        <form onSubmit={handleSave}>
          <h3>Ícone</h3>
          <SocialButtonCarousel>
            {preDefinedButtons.map((button) => {
              const Icon = FontAwesomeIcon[button.icon];

              return (
                <SocialButton
                  type="button"
                  key={button.id}
                  onClick={() => handleButtonSelection(button)}
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

          <h3>Informações</h3>
          <TextInput label="Título" required {...text("label")} />
          <TextInput label="Link" required {...text("link")} />

          <h3>Cor</h3>
          <CirclePicker
            onChange={(color) => formState.setField("color", color.hex)}
          />

          <h3>Pré visualização</h3>
          <SocialButton type="button">
            <SocialButtonIconWrapper
              background={formState.values.gradient || formState.values.color}
            >
              {SelectedIcon && <SelectedIcon />}
            </SocialButtonIconWrapper>
            <SocialButtonLabel>{formState.values.label}</SocialButtonLabel>
          </SocialButton>

          <Button>Criar link</Button>
        </form>
      </Container>
    </Overlay>
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
