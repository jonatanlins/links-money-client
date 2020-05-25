import React from "react";
import styled from "styled-components";
import api from "../services/api";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import * as FontAwesomeIcon from "react-icons/fa";
import { getUser } from "../services/auth";

import Shell from "../components/Shell";

function Page({ history }) {
  const [pages, setPages] = React.useState([]);

  const fetchData = () => {
    const user = getUser().user;

    console.log(user);

    api.get("pages").then((response) => {
      setPages(
        response.data.filter((page) =>
          page.owners.some((owner) => owner.id === user.id)
        )
      );
    });
  };

  const openLink = (username) => {
    history.push(`/${username}`);
  };

  const handleViewPage = (username) => {
    history.push(`/p/pages/${username}`);
  };

  function createNewPage() {
    const baseURL = window.location.origin.replace("http:", "https:");
    const redirect = `${baseURL}/p/newPage`;
    const clientID = "267533494431261";
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirect}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_self");
  }

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
                const Icon = FontAwesomeIcon?.[item.icon];

                return (
                  <SocialButton key={item.id}>
                    <SocialButtonIconWrapper
                      background={item.gradient || item.color}
                    >
                      {Icon && <Icon />}
                    </SocialButtonIconWrapper>
                    <SocialButtonLabel>{item.label}</SocialButtonLabel>
                  </SocialButton>
                );
              })}
            </SocialButtonCarousel>

            <InstagramMosaicWrapper>
              <InstagramMosaic>
                {page.posts.map((post) => (
                  <SquareMosaicButton key={post.id} image={post.media_url}>
                    {post.link && <FontAwesomeIcon.FaLink />}
                  </SquareMosaicButton>
                ))}
              </InstagramMosaic>
            </InstagramMosaicWrapper>

            <CardActions>
              <CardAction onClick={() => handleViewPage(page.username)}>
                <FaEdit color="#333" size={18} /> Gerenciar
              </CardAction>
              <CardAction onClick={() => openLink(page.username)}>
                <FaExternalLinkAlt color="#333" size={18} /> Visualizar
              </CardAction>
            </CardActions>
          </Card>
        ))}

        <NewPageButton onClick={createNewPage}>
          <FontAwesomeIcon.FaPlus /> Adicionar página
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
  color: #262626;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 300px;

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
  grid-template-columns: auto;
  grid-gap: 2em;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 500px;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    max-height: 600px;
  }
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
  flex: 0 0 auto;

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

const InstagramMosaicWrapper = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1 1 auto;
`;

const InstagramMosaic = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.2em;
  margin-top: 0.5em;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
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
  position: relative;

  svg {
    color: white;
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 20px;
  }
`;

export default Page;
