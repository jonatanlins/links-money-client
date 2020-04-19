import React from "react";
import styled from "styled-components";
import api from "../services/api";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import * as FontAwesomeIcon from "react-icons/fa";

import Shell from "../components/Shell";

function Page({ history }) {
  const [pages, setPages] = React.useState([]);

  const fetchData = () => {
    api.get("pages").then((response) => {
      setPages(response.data);
    });
  };

  const openLink = (id) => {
    window.open(`https://linksmoney.netlify.com/${id}`, "_blank");
  };

  const handleEdit = (id) => {
    history.push(`/pages/${id}/edit`);
  };

  const handleNewPage = () => {
    history.push(`/pages/new`);
  };

  React.useEffect(fetchData, []);

  return (
    <Shell>
      <Container>
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <Avatar src={page.avatar} alt="" />
              <CardTitle>{page.name}</CardTitle>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>

            <SocialButtonCarousel>
              {page.socialButtons.map((item) => {
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
              {page.links
                .filter((link) => link.type === "instagram")
                .map((item) => (
                  <SquareMosaicButton key={item.id} image={item.thumbnail} />
                ))}
            </InstagramMosaic>

            <CardActions>
              <CardAction onClick={() => handleEdit(page.id)}>
                <FaEdit color="#333" size={18} /> Editar
              </CardAction>
              <CardAction onClick={() => openLink(page.id)}>
                <FaExternalLinkAlt color="#333" size={18} /> Visualizar
              </CardAction>
            </CardActions>
          </Card>
        ))}

        <NewPageButton onClick={handleNewPage}>
          <FontAwesomeIcon.FaPlus /> Criar nova página
        </NewPageButton>
      </Container>
    </Shell>
  );
}

const NewPageButton = styled.button`
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #3a3a3a;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    font-size: 3em;
    margin-bottom: 0.5em;
    color: #666;
  }

  &:hover {
    background-color: #eee;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2em;
`;

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.header`
  display: grid;
  grid-template-columns: 5em auto;
  grid-template-rows: 1.35em auto;
  grid-template-areas: "avatar title" "avatar description";
  grid-gap: 0 1em;
  padding: 1em;
`;

const Avatar = styled.img`
  grid-area: avatar;
  width: 100%;
  border-radius: 9em;
  margin: auto;
`;

const CardTitle = styled.h1`
  grid-area: title;
  margin: 0;
  font-size: 1em;
`;

const CardDescription = styled.p`
  grid-area: description;
  font-size: 0.9em;
  margin: 0;
`;

const CardActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const CardAction = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1em;
  line-height: 1.618;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  height: 56px;
  outline: none;

  &:hover {
    background-color: #eee;
  }

  svg {
    margin-right: 0.5em;
  }
`;

const SocialButtonCarousel = styled.div`
  overflow-x: auto;
  display: flex;
  padding: 0 0.5em;

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
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  margin-top: 0.5em;
  max-height: 200px;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    top: 100px;
    background: linear-gradient(transparent, white);
  }
`;

const SquareMosaicButton = styled.button`
  background: center url(${(props) => props.image}) no-repeat;
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border: none;
  display: block;
  outline: none;
`;

export default Page;
