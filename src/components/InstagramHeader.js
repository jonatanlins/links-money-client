import React from "react";
import styled from "styled-components";

function Component({ avatar, username, description }) {
  return (
    <Container>
      <Avatar src={avatar} alt="" />
      <Title>{username}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

const Container = styled.header`
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

export default Component;
