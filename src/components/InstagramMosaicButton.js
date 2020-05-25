import React from "react";
import styled from "styled-components";

function SquareMosaicButton({ image, onClick, children }) {
  return (
    <StyledButton img={image} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background: center url(${(props) => props.img}) no-repeat;
  background-size: cover;
  width: 100%;
  padding-bottom: 100%;
  border: none;
  display: block;
  outline: none;
  margin: 0;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;

  svg {
    color: white;
    position: absolute;
    right: 8px;
    top: 8px;
    font-size: 20px;
  }
`;

export default SquareMosaicButton;
