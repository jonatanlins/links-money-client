import React from "react";
import api from "../services/api";
import styled, { css } from "styled-components";
import * as FontAwesomeIcon from "react-icons/fa";
import InstagramMosaicButton from "../components/InstagramMosaicButton";
import YoutubeMosaicButton from "../components/YoutubeMosaicButton";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import axios from "axios";

function Page({ match }) {
  const [pageData, setPageData] = React.useState(null);
  const [layout, setLayout] = React.useState("instagram");

  const handleSocialButton = (buttonData) => () => {
    if (buttonData.layout) {
      setLayout(buttonData.layout);
    } else {
      window.location.href = buttonData.link;
    }
  };

  const handleLink = (link) => {
    window.location.href = link;
  };

  const fetchData = () => {
    api.get(`/pages/${match.params.id}`).then((response) => {
      setPageData(response.data);

      axios
        .get(`https://www.instagram.com/${match.params.id}/?__a=1`)
        .then((response) => {
          const timeline = response.data.graphql.user.edge_owner_to_timeline_media.edges.map(
            (item) => item.node
          );

          setPageData((pageData) => ({
            ...pageData,
            timeline: timeline.map((post) => {
              return {
                thumbnail: post.thumbnail_src,
                id: post.id,
                link: pageData.links.find((link) => link.social_id === post.id)
                  ?.link,
              };
            }),
          }));
        });
    });
  };

  React.useEffect(fetchData, []);

  if (!pageData) return null;

  return (
    <Container>
      <Header>
        <Avatar src={pageData.avatar} alt="" />
        <Title>{pageData.id}</Title>
        <Description>{pageData.description}</Description>
      </Header>

      <SocialButtonCarousel>
        {pageData.socialButtons.map((item) => {
          const Icon = FontAwesomeIcon[item.icon];

          return (
            <SocialButton key={item.id} onClick={handleSocialButton(item)}>
              <SocialButtonIconWrapper background={item.gradient || item.color}>
                <Icon />
              </SocialButtonIconWrapper>
              <SocialButtonLabel>{item.label}</SocialButtonLabel>
            </SocialButton>
          );
        })}
      </SocialButtonCarousel>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={2}
      >
        <Slider>
          <Slide index={0}>
            <HelpText>Toque em algum link para ver mais</HelpText>

            <YoutubeMosaic>
              {pageData.links
                .filter((link) => link.type === "youtube")
                .map((item) => (
                  <YoutubeMosaicButton
                    key={item.etag}
                    data={item.snippet}
                    onClick={() => handleLink(item.link)}
                  />
                ))}
            </YoutubeMosaic>
          </Slide>

          <Slide index={1}>
            <HelpText>Toque em alguma imagem para ver mais</HelpText>

            <InstagramMosaic>
              {pageData.timeline?.map((post) => (
                <InstagramMosaicButton
                  key={post.id}
                  image={post.thumbnail}
                  onClick={() => handleLink(post.link)}
                />
              ))}
            </InstagramMosaic>
          </Slide>
        </Slider>
      </CarouselProvider>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  user-select: none;

  ${(props) =>
    props.overlay &&
    css`
      overflow: hidden;
    `}
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 5em auto;
  grid-template-rows: 1.35em auto;
  grid-template-areas: "avatar title" "avatar description";
  grid-gap: 0 1em;
  margin: 1em;
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

const HelpText = styled.p`
  border: 1px solid #dbdbdb;
  border-width: 1px 0;
  line-height: 2.5;
  text-align: center;
  font-size: 0.9em;
  margin: 0.75em 0 1em;
`;

const InstagramMosaic = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3px;
`;

const YoutubeMosaic = styled.div`
  margin: -5px 0 1em;
  display: flex;
  flex-direction: column;
`;

export default Page;
