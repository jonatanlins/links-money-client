import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

function Component({ children, parentPage }) {
  const history = useHistory();

  function handleClose(event) {
    if (event.target === event.currentTarget) {
      if (parentPage) {
        history.push(parentPage);
      } else {
        history.goBack();
      }
    }
  }

  return (
    <Overlay onClick={handleClose}>
      <Container>{children}</Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  padding: 1em;
  background-color: white;
  border-radius: 1em;
`;

export default Component;
