import React from "react";
import styled from "styled-components";
import { FaLink } from "react-icons/fa";

import InstagramMosaicButton from "./InstagramMosaicButton";

function Component({ posts = [], onClick }) {
  return (
    <Container>
      {posts.map((post) => (
        <InstagramMosaicButton
          key={post.id}
          image={post.media_url}
          onClick={() => onClick(post)}
        >
          {post.link && <FaLink />}
        </InstagramMosaicButton>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3px;
`;
export default Component;
