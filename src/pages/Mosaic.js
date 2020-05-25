import React from "react";
import api from "../services/api";
import styled, { css } from "styled-components";
import YoutubeMosaicButton from "../components/YoutubeMosaicButton";

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

  const handleLink = (post) => {
    if (post.link) {
      window.location.href = post.link;
    }
  };

  const fetchData = () => {
    api.get(`/pages/${match.params.id}`).then((response) => {
      setPageData(response.data);
    });
  };

  React.useEffect(fetchData, []);

  if (!pageData) return null;

  return (
    <Container>
      <InstagramHeader
        avatar={pageData.avatar}
        username={pageData.username}
        description={pageData.description}
      />

      <InstagramRoundButtons
        buttons={pageData.socialButtons}
        onClick={handleSocialButton}
      />

      {layout === "instagram" && (
        <>
          <HelpText>Toque em alguma imagem para ver mais</HelpText>
          <InstagramMosaic posts={pageData.posts} onClick={handleLink} />
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
