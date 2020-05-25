import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function Component({ children, parentPage }) {
  const history = useHistory();

  function handleClose() {
    console.log(parentPage);
    if (parentPage) {
      history.push(parentPage);
    } else {
      history.goBack();
    }
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>

        {children}
      </Container>
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
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  position: relative;
  padding: 1em;
  background-color: white;
  border-radius: 1em;
  box-sizing: border-box;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.4em;
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
  padding: 0;
  width: 1.4em;
  height: 1.4em;

  svg {
    margin-top: 4px;
    color: #222;
  }
`;

export default Component;
