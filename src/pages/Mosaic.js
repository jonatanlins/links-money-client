import React from "react";
import api from "../services/api";
import styled, { css } from "styled-components";
import YoutubeMosaicButton from "../components/YoutubeMosaicButton";
import axios from "axios";

import InstagramHeader from "../components/InstagramHeader";
import InstagramMosaic from "../components/InstagramMosaic";
import InstagramRoundButtons from "../components/InstagramRoundButtons";

function Page({ match }) {
  const [pageData, setPageData] = React.useState(null);
  const [layout, setLayout] = React.useState("instagram");

  const handleSocialButton = (buttonData) => {
    if (buttonData.layout) {
      setLayout(buttonData.layout);
    } else {
      window.location.href = buttonData.link;
    }
  };

  const handleLink = (link) => {
    if (link) {
      window.location.href = link;
    }
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
      <InstagramHeader
        avatar={pageData.avatar}
        id={pageData.id}
        description={pageData.description}
      />

      <InstagramRoundButtons
        buttons={pageData.socialButtons}
        onClick={handleSocialButton}
      />

      {layout === "instagram" && (
        <>
          <HelpText>Toque em alguma imagem para ver mais</HelpText>
          <InstagramMosaic posts={pageData.timeline} onClick={handleLink} />
        </>
      )}

      {layout === "youtube" && (
        <>
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
        </>
      )}
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

const HelpText = styled.p`
  border: 1px solid #dbdbdb;
  border-width: 1px 0;
  line-height: 2.5;
  text-align: center;
  font-size: 0.9em;
  margin: 0.75em 0 1em;
`;

const YoutubeMosaic = styled.div`
  margin: -5px 0 1em;
  display: flex;
  flex-direction: column;
`;

export default Page;
